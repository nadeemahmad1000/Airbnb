import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const createAccessToken = async (email) => {
    const id = (await User.findOne({ 'email': email }, { '_id': 1 }))._id;

    const payload = { userId: id.toString() };

    return jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '72h',
    });
};

const getUserId = (cookies) => {
    if (cookies === undefined) return null;

    const access_token = cookies.access_token;

    if (access_token) {
        const userData = jwt.verify(access_token, process.env.SECRET_TOKEN);

        if (userData) return userData.userId;
    }

    return null;
};

const verifyAccessToken = async (cookies) => {
    if (cookies === null || cookies === undefined) return null;

    let userInfo = null;
    const access_token = cookies.access_token;

    if (access_token) {
        const userData = jwt.verify(access_token, process.env.SECRET_TOKEN);

        if (userData) {
            userInfo = await User.findOne({ '_id': userData.userId }, {
                '_id': 1,
                'name': 1,
                'email': 1,
                'hostedRooms': 1,
                'wishlist': 1,
                'bookings': 1
            });
        }
    }

    return userInfo;
};

export default { createAccessToken, getUserId, verifyAccessToken };