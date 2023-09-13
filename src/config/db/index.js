const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/TikTok');
        mongoose.set('strictQuery', false);
        console.log('Connected');
    } catch (error) {
        console.log('error connection');
    }
}
module.exports = { connect };
