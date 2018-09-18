const compile = require('./')

/*
previous,author,sequence,timestamp,hash,content,signature'
previous,sequence,author,timestamp,hash,content,signature'
*/

const sbotJSON = 
{
  "key": "%R7lJEkz27lNijPhYNDzYoPjM0Fp+bFWzwX0SmNJB/ZE=.sha256",
  "value": {
    "previous": "%XphMUkWQtomKjXQvFGfsGYpt69sgEY7Y4Vou9cEuJho=.sha256",
    "author": "@FCX/tsDLpubCPKKfIrw4gc+SQkHcaD17s7GI6i/ziWY=.ed25519",
    "sequence": 2,
    "timestamp": 1514517078157,
    "hash": "sha256",
    "content": {
      "type": "post",
      "text": "Second post!"
    },
    "signature": "z7W1ERg9UYZjNfE72ZwEuJF79khG+eOHWFp6iF+KLuSrw8Lqa6IousK4cCn9T5qFa8E14GVek4cAMmMbjqDnAg==.sig.ed25519"
  },
  "timestamp": 1514517078160
}

const sbotDiffOrderJSON = 
{
  "key": "%R7lJEkz27lNijPhYNDzYoPjM0Fp+bFWzwX0SmNJB/ZE=.sha256",
  "value": {
    "previous": "%XphMUkWQtomKjXQvFGfsGYpt69sgEY7Y4Vou9cEuJho=.sha256",
    "sequence": 2,
    "author": "@FCX/tsDLpubCPKKfIrw4gc+SQkHcaD17s7GI6i/ziWY=.ed25519",
    "timestamp": 1514517078157,
    "hash": "sha256",
    "content": {
      "type": "post",
      "text": "Second post!"
    },
    "signature": "z7W1ERg9UYZjNfE72ZwEuJF79khG+eOHWFp6iF+KLuSrw8Lqa6IousK4cCn9T5qFa8E14GVek4cAMmMbjqDnAg==.sig.ed25519"
  },
  "timestamp": 1514517078160
}

const sbotDiffOrderJSON = 
{
  "key": "%R7lJEkz27lNijPhYNDzYoPjM0Fp+bFWzwX0SmNJB/ZE=.sha256",
  "value": {
    "previous": "%XphMUkWQtomKjXQvFGfsGYpt69sgEY7Y4Vou9cEuJho=.sha256",
   ("sequence": 2,
      OR 
    "author": "@FCX/tsDLpubCPKKfIrw4gc+SQkHcaD17s7GI6i/ziWY=.ed25519",)
    "timestamp": 1514517078157,
    "hash": "sha256",
    "content": {}, <- JSON.parse
    "signature": "z7W1ERg9UYZjNfE72ZwEuJF79khG+eOHWFp6iF+KLuSrw8Lqa6IousK4cCn9T5qFa8E14GVek4cAMmMbjqDnAg==.sig.ed25519"
  },
  "timestamp": 1514517078160
}

const s = JSON.stringify(sbotJSON)
const b = Buffer.from(s)

const schema = compile.schema(sbotJSON)
const parse = compile(schema, {optional: true, validate: false, unsafe: false, buffer: true, unescapeStrings: false})

//const parseNoBuf = compile(schema, {optional: true, validate: false, unsafe: false, unescapeStrings: false})


console.log('Generated code:')
console.log(parse.toString())
console.log('One parse:')
console.log(parse(s, b))

return

//const dave = {"checked":true,"checker":false,"dimensions":{"height":10,"width":5},"id":1,"name":"A green door","price":12}

const cnt = 3e6

console.time('Benching turbo-json-parse with buffer')
for (var i = 0; i < cnt; i++) {
  parse(s, b)
}
console.timeEnd('Benching turbo-json-parse with buffer')

console.time('Benching turbo-json-parse without buffer')
for (var i = 0; i < cnt; i++) {
  parseNoBuf(s)
}
console.timeEnd('Benching turbo-json-parse without buffer')


console.time('Benching JSON.parse')
for (var i = 0; i < cnt; i++) {
  JSON.parse(s)
}
console.timeEnd('Benching JSON.parse')
