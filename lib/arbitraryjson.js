const ops = require('./ops')
const Property = require('./property')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)
  const buffer = !!opts.buffer

  return compileArbitraryJSON

  function compileArbitraryJSON (gen, prop, rawSchema, compileAny) {
    const {stringSlice} = ops({buffer})
    gen(`
      let arbjson = 0
      let startjson = ptr
      do {
        if (${ch('ptr')} === ${code('"')}) {
          parseString(s, ptr)
          ptr = parseString.pointer
          continue
        }
        else if (${ch('ptr')} === ${code('{')}) ++arbjson
        else if (${ch('ptr')} === ${code('}')}) --arbjson
        ptr += 1
      } while (arbjson > 0)

      const slice = ${stringSlice('startjson', 'ptr')}
      ${prop.parent}.${prop.name} = JSON.parse(slice)
    `)
  }
}

