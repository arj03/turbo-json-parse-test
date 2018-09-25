const compile = require('./')

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
const parse = compile(sbotSchema, { prettyPrinted: true })

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

const sbotExample2 = 
{
  "key": "%H3MlLmVPVgHU6rBSzautUBZibDttkI+cU4lAFUIM8Ag=.sha256",
  "value": {
    "previous": "somthing",
    "author": "@6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519",
    "sequence": 1,
    "timestamp": 1456154790701,
    "hash": "sha256",
    "content": "box",
    "signature": "O37i6PCVZltV6Jm1MON7BzLbKCbe/Qxe3o49tiO0PUOC8q+qtWOT94Zppn6E7R9RzHVnlv47IwiKwOnVibgJBg==.sig.ed25519"
  },
  "timestamp": 1526161604274
}

const ex3 =
{
  "key": "%R0wZB82B2scyS6LaIuiIvk9E1s3rucEdvw4ClC/9RNw=.sha256",
  "value": {
    "previous": "%Es/iGfhScjop6scrM7jdHkJlQFLJWW98M7xEhZzULpo=.sha256",
    "author": "@TXKFQehlyoSn8UJAIVP/k2BjFINC591MlBC2e2d24mA=.ed25519",
    "sequence": 113,
    "timestamp": 1466648384789,
    "hash": "sha256",
    "content": {
      "type": "post",
      "text": "Hey having some trouble with a weird network setup in China, had to hardcode 'localhost' into here: \n\n    var oracle = {\n    getHostname: function () {\n      return 'localhost'\n    }\n\nElse it'd try serving on:\n\n    Starting...\n    Loading plugins from /Users/joran/.ssb/node_modules\n    Log level: notice\n    Serving at http://1.3.3.48:7777\n\nWith network config:\n\n    lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384\n\toptions=3<RXCSUM,TXCSUM>\n\tinet6 ::1 prefixlen 128\n\tinet 127.0.0.1 netmask 0xff000000\n\tinet6 fe80::1%lo0 prefixlen 64 scopeid 0x1\n\tnd6 options=1<PERFORMNUD>\n    gif0: flags=8010<POINTOPOINT,MULTICAST> mtu 1280\n    stf0: flags=0<> mtu 1280\n    en1: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500\n\tether 60:33:4b:27:aa:6f\n\tinet6 fe80::6233:4bff:fe27:aa6f%en1 prefixlen 64 scopeid 0x4\n\tinet 1.3.3.48 netmask 0xffffff00 broadcast 1.3.3.255\n\tnd6 options=1<PERFORMNUD>\n\tmedia: autoselect\n\tstatus: active\n    en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500\n\toptions=b<RXCSUM,TXCSUM,VLAN_HWTAGGING>\n\tether c4:2c:03:39:d7:91\n\tnd6 options=1<PERFORMNUD>\n\tmedia: autoselect (none)\n\tstatus: inactive\n    fw0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 4078\n\tlladdr 78:ca:39:ff:fe:11:ee:9e\n\tnd6 options=1<PERFORMNUD>\n\tmedia: autoselect <full-duplex>\n\tstatus: inactive\n    p2p0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 2304\n\tether 02:33:4b:27:aa:6f\n\tmedia: autoselect\n\tstatus: inactive",
      "channel": "patchwork-dev"
    },
    "signature": "aPhXwQiPO8nsB3/aaU91KmamnAjjvk3PmZ5N+7ARIPOPhn/hmwBRQEkfJJV199x2vKStvaf8r/F+ZGhCxQPADw==.sig.ed25519"
  },
  "timestamp": 1526161668580
}

const ex4 = {
  "key": "%JFQvDu6xHiNix0DFNDNoXAvQMMQFnv7mCgvpg6zg3oM=.sha256",
  "value": {
    "previous": "%JdGDVRjmWcg4cf2lY2EUEKqcQU2WOujS/LxFjn4oCug=.sha256",
    "author": "@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519",
    "sequence": 381,
    "timestamp": 1493697673438,
    "hash": "sha256",
    "content": {
      "type": "about",
      "about": "%A/cHZ+57MSe+2Sv5hM4c5oQVMJH6G1Nii2XE9hDrzmY=.sha256",
      "attendee": {}
    },
    "signature": "BFaCeuvRTLPOlwCjMCuj/RKoc2NgFuwv4NeuDMG0rjlQ9q+Ub6jOKpDneTK5Rdk+l7qbV6pq6rOYM0UsM7+SDw==.sig.ed25519"
  },
  "timestamp": 1526161750215
}

/*
for (var i = 0; i < 100; ++i)
  console.log(ex[i], ex.charCodeAt(i))
 */

// will return {hello: 'world'}
//console.log(parse.toString())
//console.log(parse(JSON.stringify(sbotExample)))
//console.log(ex)
//console.log(ex.replace(/[ \t\r\n]+/g,""))
//const ex = JSON.stringify(sbotExample2, null, 2)
//console.log(ex)
//console.log(JSON.stringify(sbotExample2))
//console.log(parse(ex)) // .replace(/[ \t\r\n]+/g,"")
//console.log(ex3.replace(/[ \t\r\n]+/g,""))
console.log(parse(JSON.stringify(ex4, null, 2)))

