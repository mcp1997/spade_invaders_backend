const db = require('../../data/db-config')

const find = () => {
  return db('users as u')
    .leftJoin('roles as r', 'u.role_id', 'r.role_id')
    .select('u.user_id', 'u.username', 'r.role_name')
}

const findById = user_id => {
  return db('users as u')
    .leftJoin('roles as r', 'u.role_id', 'r.role_id')
    .select('u.user_id', 'u.username', 'r.role_name')
    .where('u.user_id', user_id).first()
}

const insert = async ({ username, password }) => {
  const [user_id] = await db('users').insert(
    { 
      username, 
      password, 
      role_id: 2 /* role_id 2 === 'user' */ 
    }
  )
  return findById(user_id)
}

module.exports = { find, findById, insert }