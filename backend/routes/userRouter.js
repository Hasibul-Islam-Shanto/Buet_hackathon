const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/confirmation/:token").get(userController.confirmUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").post(userController.logoutUser)

module.exports = router;
