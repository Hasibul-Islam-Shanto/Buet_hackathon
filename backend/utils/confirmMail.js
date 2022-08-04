const nodemailer = require("nodemailer");
const { google } = require("googleapis");
async function sendEmail(msg) {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.TEAMRIVALS_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const info = await transporter.sendMail(msg);
    console.log(info);
    return info;
  } catch (err) {
    console.log(err);
  }
}
function confirmMail(toUser) {
  const message = {
    from: "Confirm mail <process.env.TEAMRIVALS_EMAIL>",
    to: toUser.email,
    subject: "Activate Account",
    text: "Hello",
    html: `
      <p>Please activate your account by clicking the link bellow, the link will expire in 6h </p>
      <a href='${process.env.FRONTEND_BASE_URL}/api/user/confirmation/${toUser.token}'>Activate Account </a>
    `,
  };

  return sendEmail(message);
}
module.exports = { confirmMail };
