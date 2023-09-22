import Room from '../models/room.js';
import token from '../services/token.js';

const dashboardGetRequest = async (req, res) => {
    try {
        const userInfo = await token.verifyAccessToken(req.cookies);

        if (userInfo === null) return res.redirect('/host');

        const roomList = await Room.find({}, {
            '_id': 0, 'roomId': 1, 'roomType': 1, 'title': 1, 'description': 1,'location': 1, 'availableFrom': 1, 'availableUpto': 1, 'rating': 1, 'price': 1, 'discount': 1, 'images': 1, 'hidden': 1
        });

        return res.status(200).render('./dashboard.ejs', {
            user: userInfo,
            rooms: roomList
        });
    } catch (error) {
        return res.status(400).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

const dashboardPostRequest = (req, res) => {
    res.send(req.body);
};

export default { dashboardGetRequest, dashboardPostRequest };