const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFYCLIENTID,
  clientSecret: process.env.SPOTIFYCLIENTSECRET,
  redirectUri: 'http://localhost:4000/spotify'
});
module.exports=spotifyApi;