import express from 'express';
import controller from '../controllers/rooms_controller.js';

const rooms = express.Router();

rooms.use(express.json());
rooms.use(express.urlencoded({ extended: true }));

rooms.get('/:roomId', controller.roomsGetRequest);

export default rooms;