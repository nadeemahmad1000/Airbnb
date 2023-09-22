import express from 'express';
import { check, validationResult } from 'express-validator';
import { validate } from 'deep-email-validator';
import User from '../models/user.js';

const validateEmail = express.Router();

validateEmail.use(express.json());
validateEmail.use(express.urlencoded({ extended: true }));

const rules = [
    check('email').trim().toLowerCase().notEmpty().escape().isEmail().normalizeEmail().custom(async (email) => {
        const valid = (await validate(email)).valid;

        if (!valid) throw new Error(`${email} doesn't exist, Please Enter a valid Email.`);
    }),
];

const checkEmail = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(200).send({ 'valid': false, 'found': false }); else next();
};

const findUser = async (req, res, next) => {
    const email = (req.query.email ? req.query.email : req.body.email);

    const user = await User.findOne({ 'email': email }, { '_id': 1 });

    if (user) return res.status(200).send({ 'valid': true, 'found': true });
    else next();
};

const middleware = [ rules, checkEmail, findUser ];

validateEmail.get('/', middleware, (req, res) => {
    res.status(200).send({ 'valid': true, 'found': false });
});

validateEmail.post('/', middleware, (req, res) => {
    res.status(200).send({ 'valid': true, 'found': false });
});

export default validateEmail;