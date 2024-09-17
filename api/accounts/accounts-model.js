const db = require('../../data/db-config') // Pulling in Knex

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
  // Using .first() so I only get an object of the item, instead of an array with an object in it.
}

const create = async account => {
  const newID = await db('accounts').insert(account)
  return getById(newID)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = async id => {
  const toBeDeleted = await getById(id)
  await db('accounts').where({ id }).del()
  return toBeDeleted
}

const getByName =  name => {
  return db('accounts').where('name','like', name)
  // specified 'LIKE' so that different cases of the name would be caught
}
module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
