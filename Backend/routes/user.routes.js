const {Router} = require('express')
const {body} = require('express-validator')
const router = Router()
const {registerUser, loginUser, getUserProfile, logoutUser} = require('../controller/user.controller')
const { authUser } = require('../middleware/auth.middleware')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters')
],
    registerUser
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password is aleast 6 characters long')
],
    loginUser
)


router.get('/profile',authUser, getUserProfile)

router.get('/logout', authUser, logoutUser)

module.exports = router;