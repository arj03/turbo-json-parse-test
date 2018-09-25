const ops = require('./ops')
const Property = require('./property')

module.exports = defaults

function defaults (opts) {
  const { ch, code, name } = ops(opts)
  const buffer = !!opts.buffer

  return compileArbitraryJSON

  function compileArbitraryJSON (gen, prop, rawSchema, compileAny) {
    const {indexOf, stringSlice} = ops({buffer})

    /*
    gen(`
      let arbjson = 0

      do {
        if (${ch('ptr')} === ${code('{')}) ++arbjson
        else if (${ch('ptr')} === ${code('}')}) --arbjson
        ptr += 1
      } while (arbjson > 0)

      ${prop.parent}.${prop.name} = ''
    `)

    return
     */

    gen(`
      let arbjson = 0
      let startjson = ptr
      do {
        if (${ch('ptr')} === ${code('"')}) {
          var i = ${indexOf('"', '++ptr')}

          while (${ch('i - 1')} === ${code('\\')}) {
            var cnt = 1
            while (${ch('i - 1 - cnt')} === ${code('\\')}) cnt++
            if ((cnt & 1) === 0) break
            i = ${indexOf('"', 'i + 1')}
          }
          ptr = i + 1
        }
        else if (${ch('ptr')} === ${code('{')}) ++arbjson
        else if (${ch('ptr')} === ${code('}')}) --arbjson
        ptr += 1
      } while (arbjson > 0)

      const slice = ${stringSlice('startjson', 'ptr')}
      ${prop.parent}.${prop.name} = JSON.parse(slice)
    `)

    return
    
    gen(`
      let arbjson = 0
      let startjson = ptr
      do {
        if (${ch('ptr')} === ${code('"')}) {
          parseString(${name}, ptr)
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

