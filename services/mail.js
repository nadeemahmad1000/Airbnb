import nodemailer from 'nodemailer';

const sendEmail = async (userName, userEmail, otp) => {
    const transporter = nodemailer.createTransport({
        host: '127.0.0.1',
        port: 8080,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_AUTH_USER,
            pass: process.env.GMAIL_AUTH_PASS
        }
    });

    const info = await transporter.sendMail({
        from: `Airbnb <${process.env.GMAIL_AUTH_USER}>`,
        to: userEmail,
        subject: `${otp} is your Airbnb Verification Code`,
        html: `
        <p> Greetings, ${userName} </p>
        <h3> Confirm your email address </h3>
        There's one quick step you need to complete before creating your Airbnb account. Let's make sure this is the right email address for you - please confirm this is the right address to use for your new account.

        <p> Please enter this verification code to get started on Airbnb: </p>
        <h1> ${otp} </h1>
        <p> Verification code expires in 15 minutes. </p>
        <p> Thanks, </p>
        <p> Airbnb </p>
        `
    }).catch((err) => {
        if (err) console.error(`${err.name}: ${err.message}`);
    });
};

export default sendEmail;