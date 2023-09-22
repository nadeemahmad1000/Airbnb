import { body, validationResult } from 'express-validator';
import { validate } from 'deep-email-validator';
import User from '../models/user.js';
import Temp from '../models/temp.js';
import bcrypt from 'bcrypt';
import sendEmail from '../services/mail.js';
import generateOTP from '../services/otp.js';

const rules = [
    body('name').trim().notEmpty().isLength({ min: 4, max: 32 }).exists().withMessage(`Name should be 4 to 32 characters long.`),

    body('email').trim().toLowerCase().escape().isEmail().normalizeEmail().custom(async (email) => {
        const valid = (await validate(email)).valid;

        if (!valid) throw new Error(`${email} doesn't exist, Please Enter a valid Email.`);
    }).custom(async (email) => {
        const user = await User.findOne({ 'email': email });

        if (user) throw new Error(`${email} is already registered with App, Please Login instead.`);
    }),

    body('password').trim().notEmpty().isLength({ min: 8, max: 32 }).exists().custom((password) => {
        const valid = (password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password));

        if (!valid) throw new Error(`Password must contain at least 8 characters with alphabets, digits & symbols.`); else return true;
    })
];

const checkRules = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(422).send({
        error: error.array()
    });

    next();
};

const createTempUserandSendEmail = async (req, res, next) => {
    try {
        const OTP = generateOTP();

        await Temp.updateOne({ 'email': req.body.email }, {
            'name': req.body.name,
            'dateOfBirth': req.body.dateOfBirth,
            'password': bcrypt.hashSync(req.body.password, 10),
            'createdAt': Date.now(),
            'otp': bcrypt.hashSync(OTP, 10)
        }, { upsert: true });

        sendEmail(req.body.name, req.body.email, OTP);

        next();
    } catch (error) {
        res.status(404).send({
            emailSent: false,
            error: `${error.name}: ${error.message}`
        });
    }
};

export default [ rules, checkRules, createTempUserandSendEmail ];