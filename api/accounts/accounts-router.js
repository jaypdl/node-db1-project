const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const allAccounts = await Account.getAll()
    res.json(allAccounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  res.json(req.idExists)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  req.body = { ...req.body, name: req.body.name.trim() }
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id',checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  req.body = { ...req.body, name: req.body.name.trim() }
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deleted = await Account.deleteById(req.params.id)
    res.json(deleted)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
