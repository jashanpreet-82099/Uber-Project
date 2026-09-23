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