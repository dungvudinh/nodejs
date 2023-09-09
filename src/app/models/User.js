const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const User = new Schema({
    email:{type:String, required:true, unique:true, lowercase:true }, 
    password:{type:String, require:true, minLength:6}, 
    decks:[{
        type:ObjectId,
        ref:'Deck'
    }]
})

module.exports = mongoose.model('User', User);