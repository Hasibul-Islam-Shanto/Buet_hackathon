const express = require("express");
const notesController = require("../controllers/noteController");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
/**
 * @swagger
 * /getone/:id:
 *   get:
 *     summary: Retrieve a specific note of a user given by id of the Note
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: string ID of the note
 *      - in: header
 *        name: X-access-token
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
*/
router
	.route("/getone/:id")
	.get(limiter,notesController.getone); 
/**
 * @swagger
 * /getallnotes:
 *   get:
 *     summary: Retrieve a list all notes
 *     description: Retrieve a list of all notes of a user.
 *     parameters:
 *      - in: header
 *        name: X-access-token
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
*/
router
	.route("/getallnotes")
	.get(limiter,notesController.getAllNotes);
/**
 * @swagger
 * /deleteOne/:id:
 *   delete:
 *     summary: Delete a specific note of a user given by id of the Note
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: string ID of the note
 *      - in: header
 *        name: X-access-token
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
*/
router.route("/deleteOne/:id")
      .delete(limiter,notesController.deleteone)
/**
 * @swagger
 * /deleteall:
 *   delete:
 *     summary: Delete the entire collection of note.
 *     parameters:
 *      - in: header
 *        name: X-access-token
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
*/
router.route("/deleteall")
      .delete(limiter,notesController.deleteAll);

router.route("/createnote")
      .post(notesController.createNote);
module.exports = router;
