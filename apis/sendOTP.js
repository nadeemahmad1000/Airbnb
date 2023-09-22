import express from 'express';
import middlewares from '../middlewares/validateUser.js';

const sendOTP = express.Router();

sendOTP.use(express.json());
sendOTP.use(express.urlencoded({ extended: true }));

sendOTP.post('/', middlewares, (req, res) => {
    res.status(200).send({ emailSent: true });
});

export default sendOTP;