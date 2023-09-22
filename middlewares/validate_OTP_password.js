import express from 'express';
import bcrypt from 'bcrypt';
import Temp from '../models/temp.js';
import User from '../models/user.js';

const validateOTP = async (req, res, next) => {
    try {
        if (req.body.otp !== undefined) {
            const tempUser = await Temp.findOne({ 'email': req.body.email }, {
                '_id': 0,
            });

            if (tempUser === null || !bcrypt.compareSync(req.body.otp, tempUser.otp)) {
                return res.status(400).send({ isOtpValid: false });
            }

            await User.create({
                'name': tempUser.name,
                'dateOfBirth': tempUser.dateOfBirth,
                'email': tempUser.email,
                'password': tempUser.password,
                'createdAt': tempUser.createdAt
            });

            await Temp.deleteOne({ 'email': tempUser.email });
        }

        next();
    } catch (error) {
        return res.status(400).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

const validatePassword = async (req, res, next) => {
    try {
        if (req.body.password !== undefined) {
            const user = await User.findOne({ email: req.body.email }, {
                '_id': 0,
                'password': 1
            });

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({ correctPassword: false });
            }
        }

        next();
    } catch (error) {
        return res.status(400).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

export default [ validateOTP, validatePassword ];