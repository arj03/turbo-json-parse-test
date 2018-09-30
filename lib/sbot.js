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

    /*
    gen(`} else if (${ch('ptr+17')} === ${code('p')} && ${ch('ptr+18')} === ${code('o')} && ${ch('ptr+19')} === ${code('s')} && ${ch('ptr+20')} === ${code('t')} && ${ch('ptr+21')} === ${code('"')}) {`)

    const postObj = {
      type: schema.OBJECT,
      name: prop.name,
      required: false,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'string' }, 'text'),
        getField({ type: 'string' }, 'root'),
        getField({ type: 'string' }, 'branch'),

        getField({ type: 'string' }, 'topic'),
        getField({ type: 'string' }, 'repliesTo'),
        getField({ type: 'null' }, 'recps'),

        getField({ type: 'string' }, 'issue'),
        getField({ type: 'string' }, 'repo'),
        {
          type: schema.ARRAY,
          name: 'issues',
          items: {
            type: schema.OBJECT,
            required: false,
            fields: [
              getField({ type: 'string' }, 'link'),
              getField({ type: 'boolean' }, 'open'),
            ]
          }
        },
        {
          type: schema.ARRAY,
          name: 'mentions',
          items: {
            type: schema.OBJECT,
            required: false,
            fields: [
              getField({ type: 'string' }, 'link'),
              getField({ type: 'string' }, 'name'),
              getField({ type: 'string' }, 'type'),
              getField({ type: 'number' }, 'size'),
              getField({ type: 'number' }, 'width'),
              getField({ type: 'number' }, 'height')
            ]
          }
        },
        {
          type: schema.ANYOF,
          name: 'channel',
          items: [
            getField({ type: 'string' }, 'channel'),
            getField({ type: 'null' }, 'channel')
          ]
        }
      ]
    }
    compileAny(gen, new Property(gen, prop.parent, postObj), postObj)
     */

    /*
    gen(`} else if (${ch('ptr+17')} === ${code('a')} && ${ch('ptr+18')} === ${code('b')} && ${ch('ptr+19')} === ${code('o')} && ${ch('ptr+20')} === ${code('u')} && ${ch('ptr+21')} === ${code('t')} && ${ch('ptr+22')} === ${code('"')}) {`)

    const aboutObj = {
      type: schema.OBJECT,
      required: false,
      defaults: false,
      name: prop.name,
      fields: [
        getField({ type: 'string' }, 'type'),
        getField({ type: 'string' }, 'about'),
        getField({ type: 'string' }, 'name'),
        getField({ type: 'string' }, 'description'),

        {
          type: schema.ANYOF,
          name: 'image',
          items: [
            getField({ type: 'string' }, 'image'),
            {
              type: schema.OBJECT,
              required: false,
              defaults: false,
              name: 'image',
              fields: [
                getField({ type: 'string' }, 'link'),
                getField({ type: 'string' }, 'name'),
                getField({ type: 'number' }, 'size'),
                getField({ type: 'string' }, 'type'),
                getField({ type: 'number' }, 'width'),
                getField({ type: 'number' }, 'height'),
              ]
            }
          ]
        },

        // random
        getField({ type: 'boolean' }, 'following'),

        {
          type: schema.ANYOF,
          name: 'publicWebHosting',
          items: [
            getField({ type: 'boolean' }, 'publicWebHosting'),
            getField({ type: 'string' }, 'publicWebHosting'),
          ]
        },

        // gathering
        {
          type: schema.OBJECT,
          required: false,
          defaults: false,
          name: 'attendee',
          fields: [
            getField({ type: 'string' }, 'link'),
            getField({ type: 'boolean' }, 'remove')
          ]
        },
        {
          type: schema.OBJECT,
          required: false,
          defaults: false,
          name: 'startDateTime',
          fields: [
            getField({ type: 'string' }, 'tz'),
            getField({ type: 'boolean' }, 'valid'),
            getField({ type: 'number' }, 'bias'),
            getField({ type: 'number' }, 'epoch'),
          ]
        },
        getField({ type: 'string' }, 'title'),
        getField({ type: 'string' }, 'link'),

        // books
        getField({ type: 'string' }, 'root'),
        getField({ type: 'string' }, 'key'),
        getField({ type: 'string' }, 'rating'),
        getField({ type: 'string' }, 'ratingMax'),
        getField({ type: 'string' }, 'ratingType'),
        getField({ type: 'string' }, 'review'),
        getField({ type: 'string' }, 'shelve'),
        getField({ type: 'string' }, 'genre'),
        getField({ type: 'string' }, 'authors'),
        getField({ type: 'string' }, 'series'),
        getField({ type: 'string' }, 'seriesNo'),
        {
          type: schema.ARRAY,
          name: 'comments',
          items: {}
        }
        
      ]
    }

    compileAny(gen, new Property(gen, prop.parent, aboutObj), aboutObj)
     */

    gen(`} else if (${ch('ptr+17')} === ${code('c')} && ${ch('ptr+18')} === ${code('o')} && ${ch('ptr+19')} === ${code('n')} && ${ch('ptr+20')} === ${code('t')} && ${ch('ptr+21')} === ${code('a')} && ${ch('ptr+22')} === ${code('c')} && ${ch('ptr+23')} === ${code('t')} && ${ch('ptr+24')} === ${code('"')}) {`)

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

    gen(`} else if (${ch('ptr+17')} === ${code('v')} && ${ch('ptr+18')} === ${code('o')} && ${ch('ptr+19')} === ${code('t')} && ${ch('ptr+20')} === ${code('e')} && ${ch('ptr+21')} === ${code('"')}) {`)
    
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

