const ops = require('./ops')
const Property = require('./property')
const schema = require('./schema')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)
  const buffer = !!opts.buffer

  return compileSbotContent

  function getField(property, name)
  {
    const f = schema.jsonSchemaToRawSchema(property, name)
    f.required = false
    f.name = name
    return f
  }

  function compileSbotContent (gen, prop, rawSchema, compileAny) {
    const {stringSlice} = ops({buffer})

    //gen(`const typePartOfObj = ${stringSlice('ptr+8', 'ptr+22')}`)
    gen(`if (${ch('ptr')} === ${code('"')}) {`)
    const stringField = {
      type: schema.STRING,
      name: prop.name
    }
    compileAny(gen, new Property(gen, prop.parent, stringField), stringField)

    //  && ${ch('ptr+24')} === ${code('o')} && ${ch('ptr+25')} === ${code('v')} && ${ch('ptr+26')} === ${code('e')}

    gen(`} else if (${ch('ptr+17')} === ${code('v')} && ${ch('ptr+21')} === ${code('"')}) {`)
    
    const voteObj = {
      type: schema.OBJECT,
      required: false,
      defaults: false,
      name: prop.name,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'null' }, 'recps'),
        {
          type: schema.ANYOF,
          name: 'channel',
          items: [
            getField({ type: 'string' }, 'channel'),
            getField({ type: 'null' }, 'channel')
          ]
        },
        {
          type: schema.OBJECT,
          required: false,
          defaults: false,
          name: 'vote',
          fields: [
            getField({ type: 'string' }, 'link'),
            getField({ type: 'number' }, 'value'),
            getField({ type: 'string' }, 'expression'),
            getField({ type: 'string' }, 'reason')
          ]
        }
      ]
    }
    compileAny(gen, new Property(gen, prop.parent, voteObj), voteObj)

    gen(`} else if (${ch('ptr+17')} === ${code('c')} && ${ch('ptr+18')} === ${code('o')} && ${ch('ptr+24')} === ${code('"')}) {`)

    const contactObj = {
      type: schema.OBJECT,
      required: false,
      defaults: false,
      name: prop.name,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'string' }, 'contact'),
        getField({ type: 'string' }, 'note'),
        getField({ type: 'string' }, 'reason'),
        getField({ type: 'boolean' }, 'autofollow'),
        getField({ type: 'boolean' }, 'flagged'),

        {
          type: schema.ANYOF,
          name: 'blocking',
          items: [
            getField({ type: 'boolean' }, 'blocking'),
            getField({ type: 'string' }, 'blocking'),
          ]
        },

        {
          type: schema.ANYOF,
          name: 'following',
          items: [
            getField({ type: 'boolean' }, 'following'),
            getField({ type: 'string' }, 'following'), // ferment
          ]
        },

        {
          type: schema.ANYOF,
          name: 'pub',
          items: [
            getField({ type: 'boolean' }, 'pub'),
            getField({ type: 'string' }, 'pub') // ferment
          ]
        },

        getField({ type: 'string' }, 'scope'), // ferment
      ]
    }
    
    compileAny(gen, new Property(gen, prop.parent, contactObj), contactObj)

    gen(`} else if (${ch('ptr+17')} === ${code('c')} && ${ch('ptr+18')} === ${code('h')} && ${ch('ptr+24')} === ${code('"')}) {`)

    const channelObj = {
      type: schema.OBJECT,
      required: false,
      defaults: false,
      name: prop.name,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'string' }, 'channel'),
        {
          type: schema.ANYOF,
          name: 'subscribed',
          items: [
            getField({ type: 'boolean' }, 'subscribed'),
            getField({ type: 'string' }, 'subscribed'), // ferment
          ]
        }
      ]
    }
    compileAny(gen, new Property(gen, prop.parent, channelObj), channelObj)

    // && ${ch('ptr+18')} === ${code('h')} && ${ch('ptr+19')} === ${code('e')} && ${ch('ptr+20')} === ${code('s')} && ${ch('ptr+21')} === ${code('s')} && ${ch('ptr+22')} === ${code('_')}

    gen(`} else if (${ch('ptr+17')} === ${code('c')} && ${ch('ptr+23')} === ${code('m')} && ${ch('ptr+27')} === ${code('"')}) {`)

    const chessMoveObj = {
      type: schema.OBJECT,
      required: false,
      defaults: false,
      name: prop.name,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'number' }, 'ply'),
        getField({ type: 'string' }, 'root'),
        getField({ type: 'string' }, 'branch'),
        getField({ type: 'string' }, 'orig'),
        getField({ type: 'string' }, 'dest'),
        getField({ type: 'string' }, 'pgnMove'),
        getField({ type: 'string' }, 'fen'),
        getField({ type: 'string' }, 'promotion'),
      ]
    }
    compileAny(gen, new Property(gen, prop.parent, chessMoveObj), chessMoveObj)

    gen(`} else if (${ch('ptr+17')} === ${code('t')} && ${ch('ptr+20')} === ${code('"')}) {`)

    const tagObj = {
      type: schema.OBJECT,
      required: false,
      defaults: false,
      name: prop.name,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'number' }, 'version'),
        getField({ type: 'boolean' }, 'tagged'),
        getField({ type: 'string' }, 'message'),
        getField({ type: 'string' }, 'root'),
        {
          type: schema.ARRAY,
          name: 'branch',
          items: getField({ type: 'string' }, 'branch')
        }
      ]
    }
    compileAny(gen, new Property(gen, prop.parent, tagObj), tagObj)

    gen(`} else {`)
    //gen(`console.log(${stringSlice('ptr+17', 'ptr+22')})`)
    //gen(`console.log("arbjsonother")`)
    const arbjsonField = {
      type: schema.ARBITRARYJSON,
      name: prop.name
    }
    compileAny(gen, new Property(gen, prop.parent, arbjsonField), arbjsonField)
    gen(`}`)
  }
}

