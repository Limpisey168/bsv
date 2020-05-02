/* global describe,it */
'use strict'
let HashCache = require('../lib/hash-cache')
let should = require('should')

describe('HashCache', function () {
  let hashPrevouts = Buffer.from('01'.repeat(32), 'hex')
  let hashSequence = Buffer.from('02'.repeat(32), 'hex')
  let hashOutputs = Buffer.from('03'.repeat(32), 'hex')

  it('should satisfy this basic API', function () {
    let hashCache = new HashCache(hashPrevouts, hashSequence, hashOutputs)
    should.exist(hashCache)
    hashCache.hashPrevouts.length.should.equal(32)
    hashCache.hashSequence.length.should.equal(32)
    hashCache.hashOutputs.length.should.equal(32)
  })

  describe('#fromBuffer', function () {
    it('should parse this known message', function () {
      let hashCache = new HashCache().fromBuffer(new HashCache(hashPrevouts, hashSequence, hashOutputs).toBuffer())
      hashCache.toHex().should.equal('7b2268617368507265766f757473223a2230313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031222c226861736853657175656e6365223a2230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032222c22686173684f757470757473223a2230333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033227d')
    })
  })

  describe('#toBuffer', function () {
    it('should parse this known message', function () {
      let hashCache = new HashCache(hashPrevouts, hashSequence, hashOutputs)
      hashCache
        .toBuffer()
        .toString('hex')
        .should.equal('7b2268617368507265766f757473223a2230313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031222c226861736853657175656e6365223a2230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032222c22686173684f757470757473223a2230333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033227d')
    })
  })

  describe('#fromJSON', function () {
    it('should parse this known json hashCache', function () {
      new HashCache()
        .fromJSON(JSON.parse('{"hashPrevouts":"0101010101010101010101010101010101010101010101010101010101010101","hashSequence":"0202020202020202020202020202020202020202020202020202020202020202","hashOutputs":"0303030303030303030303030303030303030303030303030303030303030303"}'))
        .toHex()
        .should.equal('7b2268617368507265766f757473223a2230313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031303130313031222c226861736853657175656e6365223a2230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032303230323032222c22686173684f757470757473223a2230333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033303330333033227d')
    })
  })

  describe('#toJSON', function () {
    it('should create this known message', function () {
      JSON.stringify(new HashCache(hashPrevouts, hashSequence, hashOutputs).toJSON()).should.equal(
        '{"hashPrevouts":"0101010101010101010101010101010101010101010101010101010101010101","hashSequence":"0202020202020202020202020202020202020202020202020202020202020202","hashOutputs":"0303030303030303030303030303030303030303030303030303030303030303"}'
      )
    })
  })
})