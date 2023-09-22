import multer from 'multer';
import storage from '../services/firebase.js';
import { ref, uploadBytes } from '@firebase/storage';

const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.avif|\.apng|\.jfif|\.pjpeg|\.pjp|\.svg|\.tif|\.tiff|\.bmp)$/i;

const seperatNameFromExt = (str) => {
    const file = str.split('/').pop();
    return [file.substr(0, file.lastIndexOf('.')), file.substr(file.lastIndexOf('.') + 1, file.length)]
}

const imageFilter = (req, file, cb) => {
    if (!allowedExtensions.test(file.originalname)) {
        return cb(new Error('Only image files are allowed!'), false);
    } else {
        const name = seperatNameFromExt(file.originalname);

        file.originalname = (`${name[0]}_${Date.now()}.${name[1]}`);
    }

    cb(null, true);
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter,
    limits: {
        files: 8,
        fileSize: 5 * 1024 * 1024
    }
});

const uploadFilesToFirebaseStorage = async (req, res, next) => {
    try {
        req.body.images = [];

        for (const file of req.files) {
            const imageRef = ref(storage,
                `rooms/${req.body.roomId}/${file.originalname}`);
            const metaType = {
                contentType: file.mimetype,
                name: file.originalname
            };

            const data = (await uploadBytes(imageRef, file.buffer, metaType)).metadata;

            data.fullPath = data.fullPath.replaceAll('/', '%2F');

            const imagePath = `https://firebasestorage.googleapis.com/v0/b/${data.bucket}/o/${data.fullPath}?alt=media`;

            req.body.images.push(imagePath);
        }

        next();
    } catch (error) {
        return res.status(404).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

const validateRoomInformation = (req, res, next) => {
    try {
        req.body.keywords = req.body.keywords[0].split(',');

        for (let i = 0; i < req.body.keywords.length; i ++) {
            req.body.keywords[i] = req.body.keywords[i].trim();
        }

        next();
    } catch (error) {
        return res.status(404).send({
            error: `${error.name}: ${error.message}`
        });
    }
};

export default [ upload.array('images', 8), uploadFilesToFirebaseStorage, validateRoomInformation ];