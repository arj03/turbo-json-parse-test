const compile = require('./')

const sbotJSON = 
{
  "key": "%R7lJEkz27lNijPhYNDzYoPjM0Fp+bFWzwX0SmNJB/ZE=.sha256",
  "value": {
    anyOf: [
      { "previous": "%XphMUkWQtomKjXQvFGfsGYpt69sgEY7Y4Vou9cEuJho=.sha256" },
      { "previous": null }
    ],
    "author": "@FCX/tsDLpubCPKKfIrw4gc+SQkHcaD17s7GI6i/ziWY=.ed25519",
    "sequence": 2,
    "timestamp": 1514517078157,
    "hash": "sha256",
    arbitraryJSON: { "content": "arbitrary-json" },
    "signature": "z7W1ERg9UYZjNfE72ZwEuJF79khG+eOHWFp6iF+KLuSrw8Lqa6IousK4cCn9T5qFa8E14GVek4cAMmMbjqDnAg==.sig.ed25519"
  },
  "timestamp": 1514517078160
}

// pass in a type schema
const parse = compile.from(sbotJSON)

const sbotExample = 
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

const ex = JSON.stringify(sbotExample)

// will return {hello: 'world'}
//console.log(parse.toString())
console.log(parse(ex))

