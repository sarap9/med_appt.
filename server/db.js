const mongoose = require('mongoose');

const mongoURI = "mongodb://root:xkCM0Hx5nfdb2th819NC67lH@172.21.1.1:27017/med_appt?authSource=admin";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
    }
};

module.exports = connectToMongo;