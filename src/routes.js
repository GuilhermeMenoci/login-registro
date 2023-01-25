const { Router } =  require('express')

const UserController = require('./app/controllers/UserController')
const checkToken = require('./service/middlewares')

const router = Router()



router.get('/', UserController.helloWorld)

// Private Route
router.get(
  '/user/:id', 
  checkToken, 
  UserController.listInfo
)

// Register User
router.post('/auth/register', UserController.register)

// Login User
router.post('/auth/login', UserController.login)


module.exports = router;