// import ElasticEmail from "@elasticemail/elasticemail-client";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class EmailTemplate {
  private email: string = "";
  private consent: string = "";

  constructor(email: string, consent: string) {
    this.email = email;
    this.consent = consent;
  }

  templateEmail() {
    return `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="x-apple-disable-message-reformatting">
              <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">

              <meta name="color-scheme" content="light">
              <meta name="supported-color-schemes" content="light">


              <!--[if !mso]><!-->

                <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">

                <style type="text/css">
                // TODO: fix me!
                  @import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap);
              </style>

              <!--<![endif]-->

              <!--[if mso]>
                <style>
                    // TODO: fix me!
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
              <![endif]-->


              <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
              <title></title>

              <!--[if gte mso 9]>
              <xml>
                  <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->

          <style>
              :root {
                  color-scheme: light;
                  supported-color-schemes: light;
              }

              html,
              body {
                  margin: 0 auto !important;
                  padding: 0 !important;
                  height: 100% !important;
                  width: 100% !important;

                  overflow-wrap: break-word;
                  -ms-word-break: break-all;
                  -ms-word-break: break-word;
                  word-break: break-all;
                  word-break: break-word;
              }
        center,
        #body_table {

        }

        ul, ol {
          padding: 0;
          margin-top: 0;
          margin-bottom: 0;
        }

        li {
          margin-bottom: 0;
        }



        .list-block-list-outside-left li {
          margin-left: 20px !important;
        }

        .list-block-list-outside-right li {
          margin-right: 20px !important;
        }


          .paragraph {
            font-size: 16px;
            font-family: Open Sans, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #5f5f5f;

          }


          .heading1 {
            font-size: 32px;
            font-family: Open Sans, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #444444;

          }


          .heading2 {
            font-size: 28px;
            font-family: Open Sans, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #444444;

          }


          .heading3 {
            font-size: 20px;
            font-family: Open Sans, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #444444;

          }


          .list {
            font-size: 16px;
            font-family: Open Sans, sans-serif;
            font-weight: normal;
            font-style: normal;
            text-align: start;
            line-height: 1;
            text-decoration: none;
            color: #5f5f5f;

          }


        p a,
        li a {

        display: inline-block;
          color: #3498db;
          text-decoration: none;
          font-style: normal;
          font-weight: normal;

        }

        .button-table a {
          text-decoration: none;
          font-style: normal;
          font-weight: normal;
        }

        .paragraph > span {text-decoration: none;}.heading1 > span {text-decoration: none;}.heading2 > span {text-decoration: none;}.heading3 > span {text-decoration: none;}.list > span {text-decoration: none;}


              * {
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%;
              }

              div[style*="margin: 16px 0"] {
                  margin: 0 !important;
              }

              #MessageViewBody,
              #MessageWebViewDiv {
                  width: 100% !important;
              }

              table {
                  border-collapse: collapse;
                  border-spacing: 0;
                  mso-table-lspace: 0pt !important;
                  mso-table-rspace: 0pt !important;
              }
              table:not(.button-table) {
                  border-spacing: 0 !important;
                  border-collapse: collapse !important;
                  table-layout: fixed !important;
                  margin: 0 auto !important;
              }

              th {
                  font-weight: normal;
              }

              tr td p {
                  margin: 0;
              }

              img {
                  -ms-interpolation-mode: bicubic;
              }

              a[x-apple-data-detectors],

              .unstyle-auto-detected-links a,
              .aBn {
                  border-bottom: 0 !important;
                  cursor: default !important;
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
              }

              .im {
                  color: inherit !important;
              }

              .a6S {
                  display: none !important;
                  opacity: 0.01 !important;
              }

              img.g-img+div {
                  display: none !important;
              }

              @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                  u~div .contentMainTable {
                      min-width: 320px !important;
                  }
              }

              @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                  u~div .contentMainTable {
                      min-width: 375px !important;
                  }
              }

              @media only screen and (min-device-width: 414px) {
                  u~div .contentMainTable {
                      min-width: 414px !important;
                  }
              }
          </style>

          <style>
              @media only screen and (max-device-width: 600px) {
                  .contentMainTable {
                      width: 100% !important;
                      margin: auto !important;
                  }
                  .single-column {
                      width: 100% !important;
                      margin: auto !important;
                  }
                  .multi-column {
                      width: 100% !important;
                      margin: auto !important;
                  }
                  .imageBlockWrapper {
                      width: 100% !important;
                      margin: auto !important;
                  }
              }
              @media only screen and (max-width: 600px) {
                  .contentMainTable {
                      width: 100% !important;
                      margin: auto !important;
                  }
                  .single-column {
                      width: 100% !important;
                      margin: auto !important;
                  }
                  .multi-column {
                      width: 100% !important;
                      margin: auto !important;
                  }
                  .imageBlockWrapper {
                      width: 100% !important;
                      margin: auto !important;
                  }
              }
          </style>
          <!--[if mso | IE]>
      <style>
      .button-w-ObK4ysx3wKp5pUXBz4B { padding: 12px 16px; };
      .button-w-ObK4ysx3wKp5pUXBz4B a { margin: -12px -16px; }; </style>
      <![endif]-->

      <!--[if mso | IE]>
          <style>
              .list-block-outlook-outside-left {
                  margin-left: -18px;
              }

              .list-block-outlook-outside-right {
                  margin-right: -18px;
              }

              a:link, span.MsoHyperlink {
                  mso-style-priority:99;

        display: inline-block;
          color: #3498db;
          text-decoration: none;
          font-style: normal;
          font-weight: normal;

              }
          </style>
      <![endif]-->


          </head>

          <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #ffffff;">
              <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #ffffff;">
                  <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" id="body_table" width="100%" style="background-color: #ffffff;">
                  <tbody>
                      <tr>
                          <td>
                          <![endif]-->
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="contentMainTable">
                                  <tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#fff;display:block;padding-top:50px;padding-right:20px;padding-bottom:20px;padding-left:20px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:36.80px;font-size:32px;background-color:#fff;color:#444444;margin:0;word-break:normal" class="heading1">Hi ${this.email}</p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 20px 20px;background-color:#fff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:18.40px;font-size:16px;margin:0;color:#5f5f5f;word-break:normal">To continue with the ABBSY registration please click verify to proceed with the registration.<br><br><br>Please confirm your verification.</p></td></tr><tr class="wp-block-editor-buttonblock-v1" align="center"><td style="background-color:#fff;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;width:100%" valign="top"><table role="presentation" cellspacing="0" cellpadding="0" class="button-table"><tbody><tr><td valign="top" class="button-w-ObK4ysx3wKp5pUXBz4B button-td button-td-primary" style="cursor:pointer;border:none;border-radius:4px;background-color:#3DBD61;font-size:16px;font-family:Open Sans, sans-serif;width:fit-content;text-decoration:none;color:#ffffff;overflow:hidden"><a style="color:#ffffff;display:block;padding:12px 16px 12px 16px" href="${this.consent}" target="_blank">Verify</a></td></tr></tbody></table></td></tr><tr><td valign="top" align="center" style="padding:20px 20px 20px 20px;background-color:#fff"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:13.80px;font-size:12px;margin:0;color:#5f5f5f;word-break:normal">This email was sent by:<br>abbsy@gmail.com</p></td></tr>
                              </table>
                          <!--[if mso | IE]>
                          </td>
                      </tr>
                  </tbody>
                  </table>
                  <![endif]-->
              </center>
          </body>
      </html>
    `;
  }

  // sendEmailWithElasticEmail() {
  //   let defaultClient = ElasticEmail.ApiClient.instance;
  //   let apikey = defaultClient.authentications["apikey"];

  //   apikey.apiKey = process.env.ELASTICEMAIL_API;
  //   let api = new ElasticEmail.EmailsApi();

  //   let email = ElasticEmail.EmailMessageData.constructFromObject({
  //     Recipients: [new ElasticEmail.EmailRecipient("MeowWow ")],
  //     Content: {
  //       Body: [
  //         ElasticEmail.BodyPart.constructFromObject({
  //           ContentType: "HTML",
  //           Content: "My test email content ;)",
  //         }),
  //       ],
  //       Subject: "JS EE lib test",
  //       From: "MyEmail ",
  //     },
  //   });

  //   var callback = function (error, data, response) {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       console.log("API called successfully.");
  //     }
  //   };

  //   api.emailsPost(email, callback);
  // }

  async sendEmailWithNodeMailer() {
    const transporter = nodemailer.createTransport({
      host: process.env.NM_HOST,
      port: process.env.NM_PORT,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS,
      },
    } as SMTPTransport.Options);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "ABBSY Fitness GYM <abbsy@gmail.com>", // sender address
      to: this.email, // list of receivers
      subject: "Email verification", // Subject line
      html: this.templateEmail(), // html body
    });

    console.log("Message sent: %s", info.messageId);
    return {
      message: "Email sent successfullt",
      status: 201,
    };
  }
}

export default EmailTemplate;
