const users = [
  { 
    username: 'matt6288',
    password: '$2a$08$7moM8yEIEVTozCQjRjybVelDcn88Sc1G2pwOnpp1KZc3Ocyn4du.u',
    // password '1234'
    role_id: 1
  },
  {
    username: 'ally2559',
    password: '$2a$08$z9Ef4tBIZfzy2DWKAfwDGOIzlrCwimomB7cxjGEdMMmLyIFwEnDrS',
    // password '1234'
    role_id: 1
  },
  {
    username: 'lily5459',
    password: '$2a$08$lzDn.tnX4W81iWDBfxGfBeS/OdIDlpQkflqPe0XlwkWFvoc82RQLC',
    // password '1234'
    role_id: 2
  }
]

const roles = [
  { role_name: 'admin' },
  { role_name: 'user' }
]

exports.seed = async function (knex) {
  await knex('users').truncate()
  await knex('roles').truncate()
  await knex('roles').insert(roles)
  await knex('users').insert(users)
}