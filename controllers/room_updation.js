import Room from '../models/room.js';
import token from '../services/token.js';

const updateRoomGetRequest = async (req, res) => {
    try {
        const userInfo = await token.verifyAccessToken(req.cookies);

        if (userInfo === null) return res.status(200).redirect('/host');

        const roomInfo = await Room.findOne({ 'roomId': req.params.roomId });

        if (roomInfo === null) {
            return res.status(200).redirect('/host/rooms/add');
        }

        res.status(200).render('./add_update_room.ejs', {
            user: userInfo,
            room: roomInfo
        });
    } catch (error) {
        res.status(404).send({ error: `${error.name}: ${error.message}` });
    }
};

const updateRoomPutRequest = async (req, res) => {
    try {
        await Room.updateOne({ 'roomId': req.body.roomId },
        {
            $set: {
                'roomType': req.body.roomType,
                'placeType': req.body.placeType,
                'title': req.body.title,
                'description': req.body.description,
                'basicInfo': req.body.basicInfo,
                'facilities': req.body.facilities,
                'features': req.body.features,
                'location': req.body.location,
                'security': req.body.security,
                'availableFrom': req.body.availableFrom,
                'availableUpto': req.body.availableUpto,
                'price': req.body.price,
                'discount': req.body.discount,
                'images': req.body.images,
                'hidden': ((req.body.hidden) ? (true) : (false)),
                'keywords': req.body.keywords
            }
        });

        res.status(200).send({ updated: true, error: false });
    } catch (error) {
        res.status(404).send({
            updated: false,
            error: `${error.name}: ${error.message}`
        });
    }
};

export default { updateRoomGetRequest, updateRoomPutRequest };