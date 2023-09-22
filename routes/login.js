import express from 'express';
import middleware from '../middlewares/validate_OTP_password.js';
import token from '../services/token.js';

const login = express.Router();

login.use(express.json());
login.use(express.urlencoded({ extended: true }));

login.post('/', middleware, async (req, res) => {
    try {
        const access_token = await token.createAccessToken(req.body.email);

        res.status(200).cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: true,
            secure: process.env.NODE_DEV === 'prod'
        }).send({ loggedIn: true });
    } catch (error) {
        res.status(400).send({
            loggedIn: false,
            error: `${error.name}: ${error.message}`
        });
    }
});

export default login;