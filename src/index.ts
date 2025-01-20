import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
type Mail={
  to:string,
  subject:string,
  body:string
}
module.exports=function(options: any){
   const client = new SESv2Client({ region: options.region, credentials: { accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey } });
   var sendMail=function(mail: Mail){
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

   return {
      sendMail: sendMail
   }
  };