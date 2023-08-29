const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')

describe('[0] sanity checks', () => {
  it('true is NOT false', () => {
    expect(true).not.toBe(false)
  })
  it('has correct env var', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})