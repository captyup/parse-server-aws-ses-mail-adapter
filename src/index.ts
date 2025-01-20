import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
type Mail={
  to:string,
  subject:string,
  body:string
}
type SendVerificationEmailOptions={
  link:string,
  user:any,
  appName:string
}
module.exports=function(options: any){
   const client = new SESv2Client({ region: options.region, credentials: { accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey } });
   var sendMail=async (mail: Mail)=>{
     return client.send(new SendEmailCommand({
       FromEmailAddress: options.from,
       Content: {
         Simple: {
           Body: {
             Text: {
               Data: options.isHtml ? undefined : mail.body
             },
             Html: {
               Data: options.isHtml ? mail.body : undefined
             }
           },
           Subject: {
             Data: mail.subject,
             Charset: 'UTF-8'
           }
         }
       },
       Destination: {
         ToAddresses: [
           mail.to
         ]
       }
     }))
   };
   var sendVerificationEmail=async(params: SendVerificationEmailOptions)=>{
    const verificationBodyTemplate = options.verificationBody ?? 'Hi,\n\n' +
      'You are being asked to confirm the e-mail address ' +
      '%email%' +
      ' with ' +
      '%appname%' +
      '\n\n' +
      '' +
      'Click here to confirm it:\n' +
      '%link%';
    const subjectTemplate = options.verificationSubject ?? 'Please verify your e-mail for %appname%';
    const verificationBody = verificationBodyTemplate
      .replace('%email%', params.user.get('email'))
      .replace('%appname%', params.appName)
      .replace('%link%', params.link)
      .replace('%username%', params.user.get('username'));
    const verificationSubject = subjectTemplate
      .replace('%email%', params.user.get('email'))
      .replace('%appname%', params.appName)
      .replace('%link%', params.link)
      .replace('%username%', params.user.get('username'));
    const to = params.user.get('email');
   
    return sendMail({
      to: to,
      subject: verificationSubject,
      body: verificationBody
    })
   }
   return {
      sendMail: sendMail,
      sendVerificationEmail: sendVerificationEmail
   }
  };