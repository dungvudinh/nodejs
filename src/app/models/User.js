const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const User = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter correct email'],
        },
        password: {
            type: String,
            require: [true, 'Please enter a password'],
            minLength: [6, 'minimum password length is 6 characters'],
        },
        decks: [
            {
                type: ObjectId,
                ref: 'Deck',
            },
        ],
    },
    {
        timestamps: true,
    },
);

User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
User.statics.login = async function (email, password) {
    const user = await this.findOne({ email }).exec();
    if (user) {
        console.log(user);
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};
// User.plugin(AutoIncrement, {id:'userId', inc_field:'_id'});
module.exports = mongoose.model('User', User);
