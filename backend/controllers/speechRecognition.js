let ObjectId = require("mongoose").Types.ObjectId;
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

exports.getSpeechToText = catchAsync(async (req, res, next) => {
  const SpeechKey = process.env.AZURE_KEY1;
  const location = process.env.LOCATION;
  //res.setHeader("Content-Type", "application/json");
  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": SpeechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const tokenResponse = await axios.post("https://southeastasia.api.cognitive.microsoft.com/sts/v1.0/issuetoken", null, headers);
  res.send({ token: tokenResponse.data, location: location });
  // if (tokenResponse) {
  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       user,
  //     },
  //   });
  // } else {
  //   return next(new appError("No user found with this id", 401));
  // }
});
