import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const validatePassword = express.Router();

validatePassword.use(express.json());
validatePassword.use(express.urlencoded({ extended: true }));

validatePassword.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }, {
            '_id': 0,
            'password': 1
        });

        if (bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(200).send({ correctPassword: true });
        }

        return res.status(200).send({ correctPassword: false });
    } catch (error) {
        return res.status(400).send({
            error: `${error.name}: ${error.message}`
        });
    }
});

export default validatePassword;