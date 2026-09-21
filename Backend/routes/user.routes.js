const {Router} = require('express')
const {body} = require('express-validator')
const router = Router()
const {registerUser} = require('../controller/user.controller')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters')
],
    registerUser
)


module.exports = router;