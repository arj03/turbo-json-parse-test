const objectDefaults = require('./object')
const numberDefaults = require('./number')
const stringDefaults = require('./string')
const booleanDefaults = require('./boolean')
const arrayDefaults = require('./array')
const nullDefaults = require('./null')
const anyOfDefaults = require('./anyof')
const arbitraryJSONDefaults = require('./arbitraryjson')
const sbotDefaults = require('./sbot')
const schema = require('./schema')

module.exports = defaults

function defaults (opts) {
  const compileString = stringDefaults(opts)
  const compileNumber = numberDefaults(opts)
  const compileBoolean = booleanDefaults(opts)
  const compileObject = objectDefaults(opts)
  const compileArray = arrayDefaults(opts)
  const compileNull = nullDefaults(opts)
  const compileAnyOf = anyOfDefaults(opts)
  const compileArbitraryJSON = arbitraryJSONDefaults(opts)
  const compileSbot = sbotDefaults(opts)
  
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

      case schema.NULL:
        compileNull(gen, prop)
        break

      case schema.ANYOF:
        compileAnyOf(gen, prop, rawSchema, compileAny)
        break

      case schema.SBOT:
        compileSbot(gen, prop, rawSchema, compileAny)
        break

      case schema.ARBITRARYJSON:
        compileArbitraryJSON(gen, prop, rawSchema, compileAny)
        break
    }
  }
}
