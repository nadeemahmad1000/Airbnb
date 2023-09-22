import Room from '../models/room.js';
import User from '../models/user.js';
import token from '../services/token.js';

const deleteRoomDeleteRequest = async (req, res) => {
    try {
        const roomId = Number(req.body.roomId);

        await User.updateOne({ '_id': token.getUserId(req.cookies) }, {
            $pull: {
                'wishlist': roomId,
                'hostedRooms': roomId
            }
        });

        await Room.deleteOne({ 'roomId': roomId });

        res.status(200).send({ deleted: true });
    } catch (error) {
        res.status(404).send({
            deleted: false,
            error: `${error.name}: ${error.message}`
        });
    }
};

export default { deleteRoomDeleteRequest };