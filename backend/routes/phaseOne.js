const express = require("express");
const phaseOne = require("../controllers/phaseOne");
const router = express.Router();
router
  .route("/topnews")
  .get(phaseOne.topNews);
router
  .route("/songlist")
  .get(phaseOne.songList);
router.route("/googlesearch").get(phaseOne.googleSearch);
router.route("/accesstoken").get(phaseOne.accesstoken);
module.exports = router;
