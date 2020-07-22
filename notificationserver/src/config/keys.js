
let SERVER_HOST=process.env.SITEHOST || 'http://localhost/';
let SMTP_TRANS_HOST_NAME = process.env.SMTP_TRANSPORT_HOST || 'smtp.gmail.com';
let SMTP_TRANS_PORT = process.env.SMTP_TRANSPORT_PORT || 587;
let MAIL_USER = process.env.MAIL_USER || 'pradeep4jobs@gmail.com';
let MAIL_PASSWORD = process.env.MAIL_PASSWORD || '****';
let MAIL_TEMPLATE_DIR = process.env.MAIL_TEMPLATE_DIR || '../templates';
let MAIL_FROM = process.env.MAIL_FROM || 'Nutri Newron Pediatrix <pradeep4jobs@gmail.com>';
let MAIL_OC_SUBJECT = process.env.MAIL_OC_SUBJECT || 'Your Nutri Newron Pediatrix Order Confirmed: {{ orderid }}';

let SMS_HOST_NAME = process.env.SMS_HOST_NAME || '103.86.177.75';
let SMS_PORT = process.env.SMS_PORT || 80;


module.exports = {
    server:SERVER_HOST,
    SMTPTransportHostname:SMTP_TRANS_HOST_NAME,
    SMTPTransportPort:SMTP_TRANS_PORT,
    sms_baseurl:'https://'+SMS_HOST_NAME,
    mailUser:MAIL_USER,
    mailPassword:MAIL_PASSWORD,
    mailTemplateDir:MAIL_TEMPLATE_DIR,
    from: MAIL_FROM,
    orderConfrimationSubject:MAIL_OC_SUBJECT
}