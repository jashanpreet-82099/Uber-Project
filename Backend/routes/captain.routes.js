const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const { registerCaptain } = require("../controller/captain.controller");

router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("fullname.firstname")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("fullname.lastname")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),

    body("vehicle.color")
      .notEmpty()
      .withMessage("Vehicle color is required")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),

    body("vehicle.model")
      .notEmpty()
      .withMessage("Vehicle model is required")
      .isLength({ min: 3 })
      .withMessage("Vehicle model must be at least 3 characters long"),

    body("vehicle.plate")
      .notEmpty()
      .withMessage("Vehicle plate is required")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters long"),

    body("vehicle.vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required")
      .isIn(["car", "bike", "auto"])
      .withMessage("Vehicle type must be car, bike or auto"),

    body("vehicle.capacity")
      .notEmpty()
      .withMessage("Vehicle capacity is required")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),
  ],

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    next();
  },

  registerCaptain
);

module.exports = router;