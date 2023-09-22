import express from 'express';
import rooms from '../apis/rooms.js';
import sendOTP from '../apis/sendOTP.js';
import validateEmail from '../apis/validateEmail.js';
import toggleWishlist from '../apis/toggleWishlist.js';

const api = express.Router();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use('/rooms', rooms);
api.use('/sendOTP', sendOTP);
api.use('/validateEmail', validateEmail);
api.use('/toggleWishlist', toggleWishlist);

api.get('/', (req, res) => {
    res.send('hello, this is an api route');
});

export default api;