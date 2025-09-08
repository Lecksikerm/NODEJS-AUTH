const mongoose = require('mongoose');

const connectToDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://idrisolalekann_db_user:olalekan2025@cluster0.vbizevy.mongodb.net/");
		console.log("MongoDB connected successfully");
	} catch (e) {
		console.error("MongoDB connection failed");
		process.exit(1);
	}
};

module.exports = connectToDB;

