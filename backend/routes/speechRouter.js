const express = require("express");
const speechRecognition = require("../controllers/speechRecognition");
const router = express.Router();
router.route("/").get(speechRecognition.getSpeechToText);
module.exports = router;
