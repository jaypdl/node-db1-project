const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required"})
    // could have used 422 above
  } else if (typeof name !== 'string') {
    res.status(400).json({message: "name of account must be a string"})
  } else if (name.length < 3 ||  name.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const accByName = await Account.getByName(req.body.name.trim()).first()
    if (req.method === 'PUT' && accByName) {
      const currentAcc = await Account.getById(req.params.id)
      currentAcc.id === accByName.id
        ? next()
        : res.status(400).json({ message: 'that name is taken' })
    } else if (accByName) {
      res.status(400).json({ message: "that name is taken" })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const idExists = await Account.getById(req.params.id)
    if (!idExists) {
      res.status(404).json({ message: "account not found" })
    } else {
      req.idExists = idExists
      next()
    }
  } catch (err) {
    next(err)
  }
}
