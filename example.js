const compile = require('./')

/*
const sbotJSON = 
{
  "key": "%R7lJEkz27lNijPhYNDzYoPjM0Fp+bFWzwX0SmNJB/ZE=.sha256",
  "value": {
    "previous": null,
    "author": "@FCX/tsDLpubCPKKfIrw4gc+SQkHcaD17s7GI6i/ziWY=.ed25519",
    "sequence": 2,
    "timestamp": 1514517078157,
    anyOf: [
      { arbitraryJSON: { "content": "arbitrary-json" } },
      { "content": "box" }
    ],
    "hash": "sha256",
    "signature": "z7W1ERg9UYZjNfE72ZwEuJF79khG+eOHWFp6iF+KLuSrw8Lqa6IousK4cCn9T5qFa8E14GVek4cAMmMbjqDnAg==.sig.ed25519"
  },
  "timestamp": 1514517078160
}

// multiple anyof?

    anyOf: [
      { "previous": "%XphMUkWQtomKjXQvFGfsGYpt69sgEY7Y4Vou9cEuJho=.sha256" },
      { "previous": null }
    ],

    anyOf: [
      { arbitraryJSON: { "content": "arbitrary-json" } },
      { "content": "box" }
    ],
*/

const sbotSchema = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    value: {
      type: 'object',
      properties: {
        previous: {
          type: 'anyOf',
          items: [
            { type: 'string' },
            { type: 'null' }
          ]
        },
        author: { type: 'string' },
        sequence: { type: 'number' },
        timestamp: { type: 'number' },
        content: {
          type: 'anyOf',
          items: [
            { type: 'arbitraryJSON' },
            { type: 'string' }
          ]
        },
        hash: { type: 'string' },
        signature: { type: 'string' }
      }
    },
    timestamp: { type: 'number' }
  }
}

// pass in a type schema
const parse = compile(sbotSchema)

const sbotExample = 
{
  "key": "%H3MlLmVPVgHU6rBSzautUBZibDttkI+cU4lAFUIM8Ag=.sha256",
  "value": {
    "previous": null,
    "author": "@6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519",
    "sequence": 1,
    "timestamp": 1456154790701,
    "hash": "sha256",
    "content": {
      "type": "about",
      "about": "@6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519",
      "name": "arj"
    },
    "signature": "O37i6PCVZltV6Jm1MON7BzLbKCbe/Qxe3o49tiO0PUOC8q+qtWOT94Zppn6E7R9RzHVnlv47IwiKwOnVibgJBg==.sig.ed25519"
  },
  "timestamp": 1526161604274
}

/*
for (var i = 0; i < 100; ++i)
  console.log(ex[i], ex.charCodeAt(i))
 */

// will return {hello: 'world'}
console.log(parse.toString())
console.log(parse(JSON.stringify(sbotExample)))
//console.log(ex)
//console.log(ex.replace(/[ \t\r\n]+/g,""))
const ex = JSON.stringify(sbotExample, null, 2)
//console.log(parse(ex.replace(/[ \t\r\n]+/g,"")))

