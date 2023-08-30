const request = require('supertest')
const bcrypt = require('bcryptjs')
const server = require('./api/server')
const db = require('./data/db-config')

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

describe('auth-router.js', () => {
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
    it('[3] creates a new user with a bcrypted password', async () => {
      await request(server).post('/api/auth/register').send({
        username: 'bob123',
        password: '1234',
      })
      const bob = await db('users').where('username', 'bob123').first()
      expect(bcrypt.compareSync('1234', bob.password)).toBeTruthy()
    })
    it('[4] responds with correct error if req.body is invalid', async () => {
      const res = await request(server).post('/api/auth/register').send({
        username: 'abc',
        password: '123',
      })
      expect(res.status).toBe(422)
      expect(res.body.message).toMatch(/username and password must be longer than 4 characters/i)
    })
  })

  describe('[POST] /api/auth/login', () => {
    it('[5] responds with correct message on valid credentials', async () => {
      const res = await request(server).post('/api/auth/login').send({
        username: 'matt6288',
        password: '1234'
      })
      expect(res.body.message).toMatch(/welcome back, cadet matt6288!/i)
    })
    it('[6] responds with correct message on invalid credentials', async () => {
      const res = await request(server).post('/api/auth/login').send({
        username: 'ally2559',
        password: '12345'
      })
      expect(res.status).toBe(401)
      expect(res.body.message).toMatch(/invalid credentials/i)
    })
  })
})

describe('users-router.js', () => {
  describe('[GET] /api/users', () => {
    it('[7] responds with correct status and message on invalid token', async () => {
      const res = await request(server).get('/api/users').set('Authorization', 'foobar')
      expect(res.body.message).toMatch(/invalid token/i)
    })
    it('[8] responds with correct status and message if role_name is NOT admin', async () => {
      let res = await request(server).post('/api/auth/login').send({
        username: 'lily5459',
        password: '1234'
      })
      res = await request(server).get('/api/users').set('Authorization', res.body.token)
      expect(res.status).toBe(403)
      expect(res.body.message).toMatch(/you are not authorized to view this content/i)
    })
    it('[9] responds with array of users on valid token and role_name', async () => {
      let res = await request(server).post('/api/auth/login').send({
        username: 'ally2559',
        password: '1234'
      })
      res = await request(server).get('/api/users').set('Authorization', res.body.token)
      expect(res.body).toMatchObject([
        {
          user_id: 1,
          username: 'matt6288',
          role_name: 'admin'
        },
        {
          user_id: 2,
          username: 'ally2559',
          role_name: 'admin'
        },
        {
          user_id: 3,
          username: 'lily5459',
          role_name: 'user'
        }
      ])
    })
  })
  
  describe('[GET] /api/users/:user_id', () => {
    it('[10] responds with user matching user_id on valid token', async () => {
      let res = await request(server).post('/api/auth/login').send({
        username: 'matt6288',
        password: '1234'
      })
      res = await request(server).get('/api/users/3').set('Authorization', res.body.token)
      expect(res.body).toMatchObject({
        user_id: 3,
        username: 'lily5459',
        role_name: 'user'
      })
    })
  })
})