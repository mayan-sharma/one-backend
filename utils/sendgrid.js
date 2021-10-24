const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = require('../config/config')

/**
 * Send mail using SendGrid
 * @param {Object} options - mail options
 * @param {String} options.to - email address of the recipient
 * @param {String} options.from - email address of the sender
 * @param {String} options.subject - subject of the email
 * @param {String} options.text - plain text content of the email
 * @param {String} options.html - html content of the email
 * @returns {Promise} - promise that resolves when the email is sent
 */
const sendMail = options => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    return await sgMail.send(options)
}

module.exports = { sendMail }