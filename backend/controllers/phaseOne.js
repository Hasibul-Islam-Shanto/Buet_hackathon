const axios = require('axios');
const catchAsync = require("../utils/catchAsync");
const spotifyApi = require("../utils/spotify");
exports.topNews = catchAsync(async (req, res, next) => {
    const data = req.body;
      
      const geo = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${data.lat}&lon=${data.lot}&apiKey=${process.env.GEOAPIFY}`);
       let city=geo.data.features[0].properties.city;
      
    const options = {
        method: 'GET',
        url: 'https://google-news1.p.rapidapi.com/geolocation',
        params: {geo: city, country: 'BD', lang: 'en', limit: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.GOOGLENEWSAPITOKEN,
          'X-RapidAPI-Host': 'google-news1.p.rapidapi.com'
        }
      };

     const news = await axios.request(options).then(function (response) {
        console.log(response.data);
        res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.songList = catchAsync(async (req, res, next) => {
    const data = req.body;
    let clientCred = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(clientCred.body['access_token']);
    let songData = await spotifyApi.searchTracks(data.q);
    let song = songData.body.tracks.items[0];
    res.status(200).json(song);
});