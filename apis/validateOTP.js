import express from 'express';
import bcrypt from 'bcrypt';
import Temp from '../models/temp.js';
import User from '../models/user.js';

const validateOTP = express.Router();

validateOTP.use(express.json());
validateOTP.use(express.urlencoded({ extended: true }));

validateOTP.post('/', async (req, res) => {
    try {
        const tempUser = await Temp.findOne({ email: req.body.email }, {
            '_id': 0,
        });

        if (!bcrypt.compareSync(req.body.otp, tempUser.otp)) {
            return res.status(200).send({ isOtpValid: false });
        }

        await User.create({
            'name': tempUser.name,
            'dateOfBirth': tempUser.dateOfBirth,
            'email': tempUser.email,
            'password': tempUser.password,
            'createdAt': tempUser.createdAt
        });

        await Temp.deleteOne({ email: tempUser.email });

        res.status(200).send({ isOtpValid: true });
    } catch (error) {
        return res.status(400).send({
            error: `${error.name}: ${error.message}`
        });
    }
});

export default validateOTP;