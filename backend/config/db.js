const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

module.exports = {
  connectToDatabase
};