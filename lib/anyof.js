const ops = require('./ops')
const Property = require('./property')
const schema = require('./schema')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)

  return compileAnyOf

  function compileAnyOf (gen, prop, rawSchema, compileAny) {
    if (!rawSchema.items) {
      gen(`throw new Error('Unknown anyof types')`)
    } else {
      gen(`if (${ch('ptr')} === ${code('null')}) {`)
      const nullField = rawSchema.items.find(f => f.type == schema.NULL)
      if (nullField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, nullField), nullField)
      gen(`} else if (${ch('ptr')} === ${code('"')}) {`)
      const stringField = rawSchema.items.find(f => f.type == schema.STRING)
      if (stringField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, stringField), stringField)
      gen(`} else if (${ch('ptr')} === ${code('{')}) {`)
      const objField = rawSchema.items.find(f => f.type == schema.ARBITRARYJSON || f.type == schema.OBJECT)
      if (objField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, objField), objField)
      gen(`}`)
    }
  }
}

