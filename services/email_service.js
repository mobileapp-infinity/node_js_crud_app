const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (email,subject,message) =>{
    sgMail.send({
        to: email,
        from: "scspl.remish@gmail.com",
        subject: subject,
        text: message
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}


// const sendCancelationEmail = (email,name) => {
//     sgMail.send({
//         to: email,
//         from: "scspl.remish@gmail.com",
//         subject: "Sorry to see you go!", 
//         text: `Goodbye, ${name}. I have to see you  back sometime soon.`    
//     });
// }

module.exports = {
    sendMail: sendMail,
}
