const ops = require('./ops')
const Property = require('./property')
const schema = require('./schema')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)

  return compileAnyOf

  function compileAnyOf (gen, prop, rawSchema, compileAny) {
    if (!rawSchema.fields) {
      gen(`throw new Error('Unknown anyof types')`)
    } else {
      gen(`if (${ch('ptr')} === ${code('null')}) {`)
      const nullField = rawSchema.fields.find(f => f.type == schema.NULL)
      if (nullField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, nullField), nullField)
      else
        throw new Error("No null parser found in anyOf expression")
      gen(`} else if (${ch('ptr')} === ${code('"')}) {`)
      const stringField = rawSchema.fields.find(f => f.type == schema.STRING)
      if (stringField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, stringField), stringField)
      else
        throw new Error("No string parser found in anyOf expression")
      gen(`}`)
    }
  }
}

