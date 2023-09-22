import Room from '../models/room.js';
import User from '../models/user.js';
import token from '../services/token.js';

const addRoomGetRequest = async (req, res) => {
    try {
        const userInfo = await token.verifyAccessToken(req.cookies);

        if (userInfo === null) return res.redirect('/host');

        res.status(200).render('./add_update_room.ejs', {
            user: userInfo,
            room: null
        });
    } catch (error) {
        res.status(404).send({ error: `${error.name}: ${error.message}` });
    }
};

const addRoomPostRequest = async (req, res) => {
    try {
        await Room.create({
            'roomId': req.body.roomId,
            'roomType': req.body.roomType,
            'placeType': req.body.placeType,
            'ownerId': token.getUserId(req.cookies),
            'ownerName': req.body.ownerName,
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
        });

        const roomId = Number(req.body.roomId);

        await User.updateOne({ '_id': token.getUserId(req.cookies) },
        {
            $push: { 'hostedRooms': roomId }
        });

        res.status(200).send({ newRoomAdded: true, error: false });
    } catch (error) {
        res.status(404).send({
            newRoomAdded: false,
            error: `${error.name}: ${error.message}`
        });
    }
};

export default { addRoomGetRequest, addRoomPostRequest };