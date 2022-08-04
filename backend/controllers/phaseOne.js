const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const spotifyApi = require("../utils/spotify");
exports.topNews = catchAsync(async (req, res, next) => {
  const data = req.query;
  console.log(data)
  let lat = parseFloat(data.lat[0])
  let lot = parseFloat(data.lat[1])
  console.log(lat, lot)
  const geo = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lot}&apiKey=${process.env.GEOAPIFY}`
  );
  let city = geo.data.features[0].properties.city;

  const options = {
    method: "GET",
    url: "https://google-news1.p.rapidapi.com/geolocation",
    params: { geo: city, country: "BD", lang: "en", limit: "5" },
    headers: {
      "X-RapidAPI-Key": process.env.GOOGLENEWSAPITOKEN,
      "X-RapidAPI-Host": "google-news1.p.rapidapi.com",
    },
  };

  const news = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
exports.songList = catchAsync(async (req, res, next) => {
  const data = req.query.q;
  let clientCred = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(clientCred.body["access_token"]);
  let songData = await spotifyApi.searchTracks(data);
  console.log(songData.body.tracks);
  let song = songData.body.tracks.items;
  res.status(200).json(song);
});
exports.googleSearch = catchAsync(async (req, res, next) => {
  const data = req.query.q;
 const options = {
   method: "GET",
   url: "https://google-search1.p.rapidapi.com/google-search",
   params: { hl: "en", q: data, gl: "us" },
   headers: {
     "X-RapidAPI-Key": process.env.GOOGLESEARCHAPIKEY,
     "X-RapidAPI-Host": "google-search1.p.rapidapi.com",
   },
 };

 axios
   .request(options)
   .then(function (response) {
   res.status(200).json(response.data);
   })
   .catch(function (error) {
     res.status(400).json({"error":error});
   });
  
});
