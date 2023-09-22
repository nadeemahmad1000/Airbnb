import express from 'express';
import addition from '../controllers/room_addition.js';
import updation from '../controllers/room_updation.js';
import visibility from '../controllers/room_visibility.js';
import deletion from '../controllers/room_deletion.js';
import upload from '../middlewares/upload.js';
import _delete from '../middlewares/delete.js';

const rooms = express.Router();

rooms.use(express.json());
rooms.use(express.urlencoded({ extended: true }));

rooms.get('/', (req, res) => {
    res.redirect('/host/dashboard');
});

rooms.get('/add', addition.addRoomGetRequest);

rooms.post('/add', upload, addition.addRoomPostRequest);

rooms.get('/update/:roomId', updation.updateRoomGetRequest);

const deleteThenUpload = [upload[0], _delete[0], upload[1], upload[2]];

rooms.put('/update/:roomId', deleteThenUpload, updation.updateRoomPutRequest);

rooms.patch('/visibility', visibility.changeVisibilityPatchRequest);

rooms.delete('/delete', _delete, deletion.deleteRoomDeleteRequest);

export default rooms;