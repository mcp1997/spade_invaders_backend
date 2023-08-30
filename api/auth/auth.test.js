const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[0] sanity checks', () => {
  it('true is NOT false', () => {
    expect(true).not.toBe(false)
  })
  it('has correct env var', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('server.js', () => {
  describe('[POST] /api/auth/register', () => {
    it('[1] adds a new user to the database with status 201', async () => {
      const res = await request(server).post('/api/auth/register').send({
        username: 'bob123',
        password: '1234',
      })
      const bob = await db('users').where('username', 'bob123').first()
      expect(res.status).toBe(201)
      expect(bob).toMatchObject({ username: 'bob123' })
    })
    it('[2] creates a new user with role_id 2 as the default role', async () => {
      await request(server).post('/api/auth/register').send({
        username: 'bob123',
        password: '1234',
      })
      const bob = await db('users').where('username', 'bob123').first()
      expect(bob).toMatchObject({ role_id: 2 })
    })
  })
})