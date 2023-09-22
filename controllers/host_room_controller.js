import Room from '../models/room.js';

const hostRoomGetRequest = async (req, res) => {
    if (req.query.roomId === undefined) {
        res.render('./room_info.ejs', { roomInfo: null });
    } else {
        try {
            const info = await Room.findOne({ 'roomId': req.query.roomId },
            { '_id': 0 });

            res.render('./room_info.ejs', {roomInfo: info });
        } catch (error) {
            return res.send({ error: `${error.name}: ${error.message}` });
        }
    }
};

export default { hostRoomGetRequest };