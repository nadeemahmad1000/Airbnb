import Room from '../models/room.js';

const changeVisibilityPatchRequest = async (req, res) => {
    try {
        await Room.updateOne({ 'roomId': req.body.roomId },
        {
            'hidden': req.body.hidden
        });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(404).send({
            success: false,
            error: `${error.name}: ${error.message}`
        });
    }
};

export default { changeVisibilityPatchRequest };