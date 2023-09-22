import express from 'express';
import Room from '../models/room.js';

const changeRoomVisibility = express.Router();

changeRoomVisibility.use(express.json());
changeRoomVisibility.use(express.urlencoded({ extended: true }));

changeRoomVisibility.patch('/', async (req, res) => {
    try {
        const roomList = await Room.findOneAndUpdate({
            'roomId': req.body.roomId }, { 'hidden': req.body.hidden });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(404).send({
            success: false,
            error: `${error.name}: ${error.message}`
        });
    }
});

export default changeRoomVisibility;