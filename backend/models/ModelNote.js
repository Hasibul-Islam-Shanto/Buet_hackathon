const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	favourite:{
        type:Boolean,
        default:false
    },
    note:{
        type:String,
        required:true
    }
    
});


const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
