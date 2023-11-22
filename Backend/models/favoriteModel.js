const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
    user_id: {type:String, required:true},
    favorite_books: {type: Array, required:true},
},{
    versionKey:false
})

const favoriteModel = mongoose.model("favorite", favoriteSchema);

module.exports={
    favoriteModel
}