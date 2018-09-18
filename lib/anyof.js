const ops = require('./ops')
const Property = require('./property')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)

  return compileAnyOf

  function compileAnyOf (gen, prop, rawSchema, compileAny) {
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
      
      // try parsing it using the first, it that fails take the next and so on
      // maybe try to get one that works based on type
      // might be different names

      const anyOfProp = new Property(gen, a, rawSchema.fields)
      compileAny(gen, anyOfProp, rawSchema.fields)
    }

    gen('}')

    if (!prop) gen(`return ${a}`)
    else if (assigning) prop.set(a)
  }
}

