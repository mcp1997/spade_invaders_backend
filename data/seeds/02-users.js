const users = [
  { 
    username: 'matt6288',
    password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', //replace with password from code ASAP
    role_id: 1
  },
  {
    username: 'ally2559',
    password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', //replace with password from code ASAP
    role_id: 1
  },
  {
    username: 'lily5459',
    password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', //replace with password from code ASAP
    role_id: 2
  }
]

const roles = [
  { role_name: 'admin' },
  { role_name: 'user' }
]

exports.seed = async function (knex) {
  await knex('roles').insert(roles)
  await knex('users').insert(users)
}