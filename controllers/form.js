const utils = require('../utils');

const errorHandler = require('../lib/errorHandler');

exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const emailData = {
            to: EMAIL_TO,
            from: email,
            subject: `Contact form - one`,
            text: `Email recieved from contact form \n 
                Sender name: ${name} \n
                Sender message: ${message}`,
            html: `
                <h4>Email recieved from contact form</h4>
                <p>Sender name: ${name}</p>
                <p>Sender message: ${message}</p>
                <hr/>
            `
        }
    
        await utils.sendMail(emailData);

        return res.status(200).json({
            message: 'Email sent successfully!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.contactUser = async (req, res) => {
    try {
        const { name, email, message, userEmail } = req.body;
        
        const emailData = {
            to: userEmail,
            from: email,
            subject: `Someone messaged you from one`,
            text: `Email recieved from contact form \n 
                Sender name: ${name} \n
                Sender message: ${message}`,
            html: `
                <h4>Message recieved from contact form</h4>
                <p>Name: ${name}</p>
                <p>Message: ${message}</p>
                <hr/>
            `
        }
    
        await utils.sendMail(emailData);

        return res.status(200).json({
            message: 'Email sent successfully!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
}