const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    name: {type:String, required:true},
    biography: {type: String, required:true},
    image: {type: String, required:true},
    books: {type:Array}
},{
    versionKey:false
})

const authorModel = mongoose.model("author", authorSchema);

module.exports={
    authorModel
}