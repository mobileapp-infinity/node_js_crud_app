const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);   
    } catch (error) {
        console.log(`Failed to connect ${error.message}`);
    }
}

connectDB();