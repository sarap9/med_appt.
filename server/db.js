const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/med_appt";

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to Mongo Successfully");
    }).catch((err) => {
        console.error("Error connecting to Mongo:", err);
    });
}

module.exports = connectToMongo;