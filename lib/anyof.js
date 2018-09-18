const ops = require('./ops')
const Property = require('./property')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)

  return compileAnyOf

  function compileAnyOf (gen, prop, rawSchema, compileAny) {
    if (!rawSchema.fields) {
      gen(`throw new Error('Unknown anyof types')`)
    } else {
      console.log("anyof field", rawSchema.fields)

      //genany(gen, new Property(gen, o, field), field)
      
      // try parsing it using the first, it that fails take the next and so on
      // maybe try to get one that works based on type
      // might be different names

      const anyOfProp = new Property(gen, 'o', rawSchema.fields[0])
      compileAny(gen, anyOfProp, rawSchema.fields[0])
    }
  }
}

