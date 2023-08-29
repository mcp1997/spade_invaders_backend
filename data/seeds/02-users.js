const users = [
  { 
    username: 'matt6288',
    password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq' //replace with password from code ASAP
  },
  {
    username: 'ally2559',
    password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq' //replace with password from code ASAP
  },
  {
    username: 'lily5459',
    password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq' //replace with password from code ASAP
  }
]

exports.seed = async function (knex) {
  await knex('users').insert(users)
}