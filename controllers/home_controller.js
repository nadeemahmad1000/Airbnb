import Room from '../models/room.js';
import token from '../services/token.js';
import shuffle from '../services/shuffle.js';

const homeGetRequest = async (req, res) => {
    try {
        const userInfo = await token.verifyAccessToken(req.cookies);
        const roomList = await Room.find({ 'hidden': false }, {
            '_id': 0, 'roomId': 1, 'roomType': 1, 'ownerName': 1, 'location': 1, 'availableFrom': 1, 'availableUpto': 1, 'rating': 1, 'price': 1, 'discount': 1, 'images': 1, 'keywords': 1
        });

        return res.status(200).render('./home.ejs', {
            user: userInfo,
            rooms: roomList
        });
    } catch (error) {
        return res.send({ error: `${error.name}: ${error.message}` });
    }
};

export default { homeGetRequest };