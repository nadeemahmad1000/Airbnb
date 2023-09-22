import mongoose from 'mongoose';

const connectDatabase = async (url) => {
    await mongoose.connect(url).catch((error) => {
        if (error) console.error(`${error.name}: ${error.message}`);
    });
};

export default { connectDatabase };