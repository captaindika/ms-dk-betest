// external imports
const mongoose = require("mongoose");
require('dotenv').config()
const dbConnect = async () => {
  mongoose
    .connect(
        process.env.MONGOURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB!");
      console.error(error);
    });
}

module.exports = dbConnect;