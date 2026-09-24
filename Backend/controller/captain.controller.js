const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/caption.model')
const captainService = require('../services/captain.services')
const {validationResult} = require('express-validator')


module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    console.log(req.body)

    const {fullname, email, password, vehicle} = req.body;

    const existingCaptain = await captainModel.findOne({email});

    if(existingCaptain){
        return res.status(400).json({
            message: 'Captain with this email already exists.'
        })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        model: vehicle.model,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
    })

    const token = await captain.generateAuthToken();

    res.status(201).json({message: 'Captain registered successfully', token, captain})
}


module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password')

    if(!captain) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }


    const token = captain.generateAuthToken();

    res.cookie('token', token);


    res.status(200).json({token, captain});
}



module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain})

}


module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token})

    res.clearCookie('token');

    res.status(200).json({message: "logout successfully"})
}