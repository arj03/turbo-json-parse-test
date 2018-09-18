const objectDefaults = require('./object')
const numberDefaults = require('./number')
const stringDefaults = require('./string')
const booleanDefaults = require('./boolean')
const arrayDefaults = require('./array')
const anyOfDefaults = require('./anyof')
const schema = require('./schema')

module.exports = defaults

function defaults (opts) {
  const compileString = stringDefaults(opts)
  const compileNumber = numberDefaults(opts)
  const compileBoolean = booleanDefaults(opts)
  const compileObject = objectDefaults(opts)
  const compileArray = arrayDefaults(opts)
  const compileAnyOf = anyOfDefaults(opts)
  
  return compileAny

  function compileAny (gen, prop, rawSchema) {
    //console.log("compile any", rawSchema.type, prop)
    switch (rawSchema.type) {
      case schema.STRING:
        compileString(gen, prop)
        break

      case schema.NUMBER:
        compileNumber(gen, prop)
        break

      case schema.BOOLEAN:
        compileBoolean(gen, prop)
        break

      case schema.OBJECT:
        compileObject(gen, prop, rawSchema, compileAny)
        break

      case schema.ARRAY:
        compileArray(gen, prop, rawSchema, compileAny)
        break

      case schema.ANYOF:
        compileAnyOf(gen, prop, rawSchema, compileAny)
        break
    }
  }
}
