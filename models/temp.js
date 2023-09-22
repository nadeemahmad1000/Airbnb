import mongoose from 'mongoose';

const schema = mongoose.Schema({
    'name': {
        type: String,
        trim: true,
        required: true
    },

    'dateOfBirth': {
        type: Date,
        required: true
    },

    'email': {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    'password': {
        type: String,
        trim: true,
        required: true
    },

    'createdAt': {
        type: Date,
        default: new Date(),
        expires: 60 * 15
    },

    'otp': {
        type: String,
        trim: true,
        required: true
    }
}, {
    versionKey: false
});

const Temp = mongoose.model('temp', schema);

export default Temp;