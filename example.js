const compile = require('./')

// pass in a type schema
const parse = compile.from({
  hello: 'string',
  num: 42,
  anyOf: [
    { world: 'string' },
    { world: null }
  ],
  flag: true,
  flags: [true],
  nested: {
    more: 'string'
  }
})

const ex = JSON.stringify({
  hello: 'world',
  world: 'null'
})

// will return {hello: 'world'}
console.log(parse.toString())
console.log(parse(ex))

