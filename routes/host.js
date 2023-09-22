import express from 'express';
import controller from '../controllers/host_controller.js';
import dashboard from './dashboard.js';
import rooms from './host_room.js';

const host = express.Router();

host.use(express.json());
host.use(express.urlencoded({ extended: true }));

host.get('/', controller.hostGetRequest);

host.use('/dashboard', dashboard);
host.use('/rooms', rooms);

export default host;