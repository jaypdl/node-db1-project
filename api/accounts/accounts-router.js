const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  const allAccounts = await Account.getAll()
  res.json(allAccounts)
})

router.get('/:id', async (req, res, next) => {
  const account = await Account.getById(req.params.id)
  res.json(account)
})

router.post('/', async (req, res, next) => {
  const newAccount = await Account.create(req.body)
  res.status(201).json(newAccount)
})

router.put('/:id', async (req, res, next) => {
  const updatedAccount = await Account.updateById(req.params.id, req.body)
  res.json(updatedAccount)
});

router.delete('/:id', async (req, res, next) => {
  const deleted = await Account.deleteById(req.params.id)
  res.json(deleted)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
