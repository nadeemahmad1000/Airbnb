import storage from '../services/firebase.js';
import { deleteObject, ref } from '@firebase/storage';

const deleteFilesFromFirebaseStorage = async (req, res, next) => {
    try {
        req.body.oldFiles = JSON.parse(req.body.oldFiles);

        for (const fileName of req.body.oldFiles) {
            const deleteRef = ref(storage, `rooms/${req.body.roomId}/${fileName}`);

            await deleteObject(deleteRef);
        }

        next();
    } catch (error) {
        res.status(404).send({
            deleted: false,
            error: `${error.name}: ${error.message}`
        });
    }
};

export default [ deleteFilesFromFirebaseStorage ];