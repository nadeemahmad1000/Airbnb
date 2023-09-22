import express from 'express';
import controller from '../controllers/home_controller.js';

const home = express.Router();

home.use(express.json());
home.use(express.urlencoded({ extended: true }));

home.get('/', controller.homeGetRequest);

export default home;