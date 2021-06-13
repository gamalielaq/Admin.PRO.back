const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( process.env.GOOGLE_ID );

const googleVerify = async( token ) =>  {

    console.log('se quiiii tokn');

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  const { name, email, picture } = payload;

  return  { name, email, picture };
}
// verify().catch(console.error);

module.exports = {
    googleVerify
}