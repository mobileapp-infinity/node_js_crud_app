const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });   
    } catch (error) {
        console.log(`Failed to connect ${error.message}`);
    }
}

connectDB();