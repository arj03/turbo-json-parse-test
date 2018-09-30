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
      gen (`switch (${ch('ptr')}) {
        case ${code('t')}:
        case ${code('f')}:`)
      const boolField = rawSchema.items.find(f => f.type == schema.BOOLEAN)
      if (boolField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, boolField), boolField)
      gen(`break
        case ${code('n')}:`)
      const nullField = rawSchema.items.find(f => f.type == schema.NULL)
      if (nullField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, nullField), nullField)
      gen(`break
        case ${code('"')}:`)
      const stringField = rawSchema.items.find(f => f.type == schema.STRING)
      if (stringField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, stringField), stringField)
      gen(`break
        case ${code('{')}:`)
      const objField = rawSchema.items.find(f => f.type == schema.ARBITRARYJSON || f.type == schema.OBJECT)
      if (objField !== undefined)
        compileAny(gen, new Property(gen, prop.parent, objField), objField)
      gen(`break
      }`)
    }
  }
}

