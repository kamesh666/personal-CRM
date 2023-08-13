const mongoose = require("mongoose");

function mongodb() {
  const mongoUri = process.env.MONGO_URI;

  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to mongoDB ${mongoUri}`);
    })
    .catch((err) => {
      console.error(`mongodb error: ${err.message}`);
    });
}

module.exports = { mongodb };
