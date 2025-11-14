import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
type Mail={
  to:string,
  subject:string,
  text:string
}
type SendEmailOptions={
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
             Html: {
               Data: mail.text
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
   var sendVerificationEmail=async(params: SendEmailOptions)=>{
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

    // Extract token from link
    const url = new URL(params.link);
    const token = url.searchParams.get('token') ?? '';

    const verificationBody = verificationBodyTemplate
      .replaceAll('%email%', params.user.get('email'))
      .replaceAll('%appname%', params.appName)
      .replaceAll('%link%', params.link)
      .replaceAll('%username%', params.user.get('username'))
      .replaceAll('%token%', token);
    const verificationSubject = subjectTemplate
      .replaceAll('%email%', params.user.get('email'))
      .replaceAll('%appname%', params.appName)
      .replaceAll('%link%', params.link)
      .replaceAll('%username%', params.user.get('username'))
      .replaceAll('%token%', token);
    const to = params.user.get('email');
   
    return sendMail({
      to: to,
      subject: verificationSubject,
      text: verificationBody
    })
   }
   var sendPasswordResetEmail=async(params: SendEmailOptions)=>{
    const resetPasswordBodyTemplate = options.resetPasswordBody ?? 'Hi,\n\n' +
      'You requested to reset your password for ' +
      '%appname%' +
       " (your username is '%username%' )"
      '.\n\n' +
      '' +
      'Click here to reset it:\n' +
      '%link%';
    const resetPasswordSubjectTemplate = options.resetPasswordSubject ?? 'Password Reset for ' + '%appname%';

    // Extract token from link
    const url = new URL(params.link);
    const token = url.searchParams.get('token') ?? '';

    const resetPasswordBody = resetPasswordBodyTemplate
      .replaceAll('%email%', params.user.get('email'))
      .replaceAll('%appname%', params.appName)
      .replaceAll('%link%', params.link)
      .replaceAll('%username%', params.user.get('username'))
      .replaceAll('%token%', token);
    const resetPasswordSubject = resetPasswordSubjectTemplate
      .replaceAll('%email%', params.user.get('email'))
      .replaceAll('%appname%', params.appName)
      .replaceAll('%link%', params.link)
      .replaceAll('%username%', params.user.get('username'))
      .replaceAll('%token%', token);
    const to = params.user.get('email');
   
    return sendMail({
      to: to,
      subject: resetPasswordSubject,
      text: resetPasswordBody
    })
   }
   return {
      sendMail: sendMail,
      sendVerificationEmail: sendVerificationEmail,
      sendPasswordResetEmail: sendPasswordResetEmail
   }
  };