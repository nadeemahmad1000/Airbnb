import mongoose from 'mongoose';

const schema = mongoose.Schema({
    'name': { type: String, trim: true, required: true },

    'dateOfBirth': { type: Date, format: '%d-%m-%y', required: true },

    'email': { type: String, trim: true, unique: true, required: true },

    'password': { type: String, trim: true, required: true },

    'hostedRooms': { type: Array, required: false, default: [] },

    'wishlist': { type: Array, required: false, default: [] },

    'bookings': { type: Array, required: false, default: [] },
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const User = mongoose.model('users', schema);

export default User;