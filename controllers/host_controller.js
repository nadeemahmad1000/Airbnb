import token from '../services/token.js';

const hostGetRequest = async (req, res) => {
    try {
        const userInfo = await token.verifyAccessToken(req.cookies);

        return res.status(200).render('./host.ejs', { user: userInfo });
    } catch (error) {
        return res.status(404).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

export default { hostGetRequest };