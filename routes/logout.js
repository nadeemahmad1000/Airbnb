import express from 'express';

const logout = express.Router();

logout.use(express.json());
logout.use(express.urlencoded({ extended: true }));

logout.post('/', async (req, res) => {
    try {
        res.status(200).clearCookie('access_token').send({ loggedOut: true });
    } catch (error) {
        res.status(400).send({
            loggedOut: false,
            error: `${error.name}: ${error.message}`
        });
    }
});

export default logout;