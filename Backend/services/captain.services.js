const captainModel = require("../models/caption.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  model,
  plate,
  vehicleType,
  capacity,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !model ||
    !plate ||
    !vehicleType ||
    !capacity
  ) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },

    email,
    password,

    vehicle: {
      color,
      model,
      plate,
      vehicleType,
      capacity,
    },
  });

  return captain;
};