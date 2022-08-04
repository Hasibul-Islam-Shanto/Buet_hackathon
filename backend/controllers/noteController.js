const Note = require("../models/ModelNote");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Token = require("../models/ModelToken");

exports.getAllNotes = catchAsync(async (req, res, next) => {
    const notes = await Note.find({})
    .sort({ natural: -1 });
    return res.status(200).json({
        notes
    })
  })

exports.getone = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const note = await Note.find({ _id: id });
    return res.status(200).json(note);
});
exports.createNote = catchAsync(async (req, res, next) => {
    const data = req.body;
   const { note, id } = req.body;
   const notes = await Note.create({
    id,
    note,
  });
  res.status(200).json({
    status: "success",
    data: {
      notes,
    },
  });});
  

exports.deleteAll = catchAsync(async (req, res, next) => {
  const token = req.headers.token;
  const user = Token.find({_id:token});
  const note = Note.deleteMany({user:user_id});
  res.status(200).json({
    messege:"Successfully Deleted All"
  })
});
exports.deleteone = catchAsync(async (req, res, next) => {
    const note = Note.deleteMany({_id:id});
    res.status(200).json({
      messege:"Successfully Deleted the note"
    })
  });
