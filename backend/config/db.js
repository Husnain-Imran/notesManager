const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })  
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("s",error.message); 
        console.log(process.env.MONGO_URI)
        process.exit();
    }
}
module.exports = connectDB;