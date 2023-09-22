import mongoose from 'mongoose';
import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;
const Decimal128 = mongodb.Decimal128;

const schema = new mongoose.Schema({
    'roomId': { type: Number, unique: true },

    'roomType': { type: String, trim: true, required: true, default: 'House' },

    'placeType': {
        type: String,
        trim: true,
        required: true,
        default: 'An entire place'
    },

    'ownerId': { type: ObjectId, required: true },

    'ownerName': { type: String, trim: true, required: true },

    'title': {
        type: String,
        trim: true,
        required: true,
        default: 'Room in a home hosted by Anshu'
    },

    'description': {
        type: String,
        trim: true,
        required: true,
        default: 'A quiet happy place to stay.'
    },

    'basicInfo': new mongoose.Schema({
        'guests': { type: Number, required: true, default: 1 },

        'bedrooms': { type: Number, required: true, default: 1 },

        'beds': { type: Number, required: true, default: 1 },

        'bathrooms': { type: Number, required: true, default: 1 }
    }, { '_id': false }),

    'facilities': { type: Array, required: false, default: [] },

    'features': { type: Array, required: false, default: [] },

    'location': new mongoose.Schema({
        'address': { type: String, required: true, trim: true },

        'pincode': { type: Number, required: true, },

        'city': { type: String, required: true, trim: true },

        'state': { type: String, required: true, trim: true },

        'country': {
            type: String,
            required: true,
            trim: true,
            default: 'India'
        }
    }, { '_id': false }),

    'security': { type: Array, required: false, default: [] },

    'availableFrom': { type: Date, required: true, default: new Date() },

    'availableUpto': {
        type: Date,
        required: true,
        default: new Date().setDate(new Date().getDate() + 1)
    },

    'rating': { type: Decimal128, required: false, default: 0 },

    'price': { type: String, required: true, default: '789' },

    'discount': { type: Number, required: true, default: 15 },

    'images': { type: Array, required: true },

    'hidden': { type: Boolean, default: false },

    'keywords': { type: Array, required: false, default: [] },

    'reservedBy': { type: Array, required: false, default: [] },
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const Room = new mongoose.model('rooms', schema);

export default Room;