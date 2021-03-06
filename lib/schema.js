const STRING = exports.STRING = 0
const NUMBER = exports.NUMBER = 1
const BOOLEAN = exports.BOOLEAN = 2
const ARRAY = exports.ARRAY = 3
const OBJECT = exports.OBJECT = 4
const UNKNOWN = exports.UNKNOWN = 5
const NULL = exports.NULL = 6
const ANYOF = exports.ANYOF = 7
const ARBITRARYJSON = exports.ARBITRARYJSON = 8
const SBOT = exports.SBOT = 9

exports.inferRawSchema = (obj, opts) => inferRawSchema(obj, opts || {}, null)
exports.jsonSchemaToRawSchema = convertToRawSchema

function type (val) {
  if (Array.isArray(val)) return ARRAY
  else if (val === null) return NULL
  switch (typeof val) {
    case 'string': return STRING
    case 'number': return NUMBER
    case 'boolean': return BOOLEAN
    case 'object': return val ? OBJECT : UNKNOWN
  }
  return UNKNOWN
}

function convertToRawSchema (jsons, parentName, opts) {
  const ordered = !!(opts && opts.ordered)
  const s = {
    type: 0,
    name: undefined,
    required: false,
    ordered: jsons.ordered || ordered,
    default: jsons.default || undefined,
    fields: undefined,
    items: undefined
  }

  switch (jsons.type) {
    case 'integer':
    case 'number':
      s.type = NUMBER
      break
    case 'string':
      s.type = STRING
      break
    case 'boolean':
      s.type = BOOLEAN
      break
    case 'null':
      s.type = NULL
      break
    case 'object':
      s.type = OBJECT
      s.fields = []
      for (const k of Object.keys(jsons.properties)) {
        const f = convertToRawSchema(jsons.properties[k], k, opts)
        f.required = !!((jsons.required && jsons.required.indexOf(k) > -1) || jsons.properties[k].required)
        f.name = k
        s.fields.push(f)
      }
      break
    case 'array':
      s.type = ARRAY
      s.items = jsons.items ? convertToRawSchema(jsons.items, null, opts) : null
    break
    case 'anyOf':
      s.type = ANYOF
      s.items = []
      for (var i = 0; i < jsons.items.length; ++i) {
        const f = convertToRawSchema(jsons.items[i], parentName, opts)
        f.name = parentName
        s.items.push(f)
      }
      break
    case 'arbitraryJSON':
      s.type = ARBITRARYJSON
      break
    case 'sbot':
      s.type = SBOT
      break
    default:
      throw new Error('Unknown type: ' + jsons.type)
  }

  return s
}

function inferRawSchema (obj, opts, name) {
  let t = type(obj)

  const prop = {
    type: t,
    name: name || undefined,
    required: !!opts.required,
    ordered: !!opts.ordered,
    allowEmpty: opts.allowEmpty !== false,
    fields: undefined,
    items: undefined
  }

  if (t === OBJECT) {
    prop.fields = []
    for (const key of Object.keys(obj)) {
      prop.fields.push(inferRawSchema(obj[key], opts, key))
    }
    return prop
  }
  else if (t === ARRAY) {
    prop.items = obj.length ? inferRawSchema(obj[0], opts, null) : null
    return prop
  }

  return prop
}
