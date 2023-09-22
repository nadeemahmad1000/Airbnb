import express from 'express';
import Room from '../models/room.js';

const rooms = express.Router();

rooms.use(express.json());
rooms.use(express.urlencoded({ extended: true }));

rooms.get('/', async (req, res) => {
    try {
        const roomList = await Room.find({});

        res.status(200).send(roomList);
    } catch (error) {
        res.status(404).send({ error: `${error.name}: ${error.message}` });
    }
});

rooms.get('/roomId', async (req, res) => {
    try {
        const roomIds = await Room.find({}, { '_id': 0, 'roomId': 1 });

        return res.status(200).send(roomIds);
    } catch (error) {
        return res.status(404).send(`${error.name}: ${error.message}`);
    }
});

rooms.get('/:roomId', async (req, res) => {
    try {
        const room = await Room.findOne({ 'roomId': req.params.roomId });

        res.status(200).send(room);
    } catch (error) {
        res.status(404).send({ error: `${error.name}: ${error.message}` });
    }
});

export default rooms;