const generateOTP = () => {
    const chars = '0123456789';

    let otp = '';

    for (let x = 0; x < 6; x ++) otp += chars[Math.floor(Math.random() * 10)];

    return otp;
};

export default generateOTP;