import express from 'express';
import controller from '../controllers/dashboard_controller.js';

const dashboard = express.Router();

dashboard.use(express.json());
dashboard.use(express.urlencoded({ extended: true }));

dashboard.get('/', controller.dashboardGetRequest);

export default dashboard;