import Room from '../models/room.js';
import token from '../services/token.js';

const roomsGetRequest = async (req, res) => {
    try {
        const userInfo = await token.verifyAccessToken(req.cookies);
        const roomDetails = await Room.findOne({ roomId: req.params.roomId });

        if (roomDetails === null) res.status(200).redirect('/');

        res.status(200).render('./room.ejs', {
            user: userInfo,
            room: roomDetails
        });
    } catch (error) {
        return res.status(404).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

export default { roomsGetRequest };