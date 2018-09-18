const compile = require('./')

// pass in a type schema
const parse = compile.from({
  hello: 'string',
  num: 42,
  testing: null,
  flag: true,
  flags: [true],
  nested: {
    more: 'string'
  }
})

/*
  anyOf: [
    { world: 'string' },
    { world: null }
  ],
*/

const ex = JSON.stringify({
  hello: 'world',
  testing: null
})

// will return {hello: 'world'}
console.log(parse(ex))
console.log(parse.toString())
