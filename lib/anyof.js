const ops = require('./ops')
const Property = require('./property')

module.exports = defaults

function defaults (opts) {
    const { ch, code } = ops(opts)

    console.log("compile anyof ", ch)
    console.log("compile anyof 2 ", code)

    return compileAnyOf

    function compileAnyOf (gen, prop, rawSchema, compileAny) {
	console.log("compile anyof 1")
	const assigning = !prop || !prop.getable
	const a = assigning ? gen.sym(rawSchema.name || 'anyof') : prop.get()

	if (assigning) {
	    gen(`const ${a} = []`)
	}

	gen(`while (${ch('ptr++')} !== ${code(']')}) {`)

	    if (!rawSchema.fields) {
		gen(`throw new Error('Unknown anyof types')`)
	    } else {
		console.log("anyof field", rawSchema.fields)
		const anyOfProp = new Property(gen, a, rawSchema.fields)
		compileAny(gen, anyOfProp, rawSchema.fields)
	    }

        gen('}')

	if (!prop) gen(`return ${a}`)
        else if (assigning) prop.set(a)
    }
}

