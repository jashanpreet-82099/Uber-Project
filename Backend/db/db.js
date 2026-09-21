const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connect to DB");
    })
    .catch((err) => {
      console.log(err.message);
    });
}


module.exports = connectToDb;