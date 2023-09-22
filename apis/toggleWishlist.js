import express from 'express';
import User from '../models/user.js';
import token from '../services/token.js';

const toggleWishlist = express.Router();

toggleWishlist.use(express.json());
toggleWishlist.use(express.urlencoded({ extended: true }));

toggleWishlist.patch('/', async (req, res) => {
    try {
        const roomId = Number(req.body.roomId);

        if (req.body.add) {
            await User.updateOne({ '_id': token.getUserId(req.cookies) },
            {
                $push: { 'wishlist': roomId }
            });
        } else {
            await User.updateOne({ '_id': token.getUserId(req.cookies) },
            {
                $pull: { 'wishlist': roomId }
            });
        }

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(404).send({
            success: false,
            error: `${error.name}: ${error.message}`
        });
    }
});

export default toggleWishlist;