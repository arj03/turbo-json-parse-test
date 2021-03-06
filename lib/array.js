const ops = require('./ops')
const Property = require('./property')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)

  const allowEmptyArrays = opts.allowEmptyArrays !== false
  const prettyPrinted = !!opts.prettyPrinted

  return compileArray

  function compileArray (gen, prop, rawSchema, compileAny) {
    const assigning = !prop || !prop.getable
    const allowEmpty = rawSchema.allowEmpty !== false && allowEmptyArrays

    const a = assigning ? gen.sym(rawSchema.name || 'arr') : prop.get()

    if (assigning) {
      gen(`const ${a} = []`)
    }

    // FIXME: validate?
    gen(`if (${ch('ptr')} !== ${code('[')}) { throw new Error('Array does not start with [') }`)

    if (allowEmpty) {
      gen(`
        if (${ch('ptr + 1')} === ${code(']')}) {
          ptr += 2
        } else {
      `)
    }

    gen(`while (${ch('ptr++')} !== ${code(']')}) {`)

    if (prettyPrinted)
      gen(`while (${ch('ptr')} === ${code(' ')} || ${ch('ptr')} === ${code('\n')}) ptr++`) // whitespace

    if (!rawSchema.items) {
      gen(`throw new Error('Unknown array type')`)
    } else {
      const arrProp = new Property(gen, a, rawSchema.items)
      compileAny(gen, arrProp, rawSchema.items)
    }

    if (prettyPrinted)
      gen(`while (${ch('ptr')} === ${code(' ')} || ${ch('ptr')} === ${code('\n')}) ptr++`) // whitespace

    gen('}')

    if (allowEmpty) {
      gen('}')
    }

    if (!prop) gen(`return ${a}`)
    else if (assigning) prop.set(a)
  }
}
