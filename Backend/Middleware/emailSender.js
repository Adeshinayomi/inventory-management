const nodemailer=require('nodemailer')


transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

sendEmail=(to,subject,text)=>{
    const mailOptions={
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        text:text
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error(error)
        }else{
            console.log('Email sent: '+info.response)
        }
    })
}

module.exports=sendEmail