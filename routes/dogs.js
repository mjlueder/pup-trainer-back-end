const router = require('express').Router()
const dogsCtrl = require('../controllers/dogs.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/

router.get('/', dogsCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, dogsCtrl.create)
router.put('/:id', checkAuth, dogsCtrl.update)

module.exports = router