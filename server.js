import express from 'express';
import dotenv from 'dotenv';
import database from './connections/database.js';
import home from './routes/home.js';
import rooms from './routes/rooms.js';
import host from './routes/host.js';
import api from './routes/api.js';
import login from './routes/login.js';
import logout from './routes/logout.js';
import helmet from 'helmet';
import path from 'path';
import { v4 as uuid } from 'uuid';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

const hostName = '127.0.0.1';
const port = process.env.PORT;

const __dirname = path.resolve();

database.connectDatabase(process.env.DATABASE_URL);

app.use('*/css', express.static(__dirname + '/public/css'));
app.use('*/images', express.static(__dirname + '/public/images'));
app.use('*/javascript', express.static(__dirname + '/public/javascript'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', home);
app.use('/rooms', rooms);
app.use('/host', host);
app.use('/login', login);
app.use('/logout', logout);

app.use('/api', api);

app.listen(port, hostName, () => {
    console.log(`Server is running at http://${hostName}:${port}/`);
});