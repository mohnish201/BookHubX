const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    book_id: {type:String, required:true},
    user_id: {type: String, required:true},
    rating: {type: Number, required:true},
    reviewText: {type:String, required:true}
},{
    versionKey:false
})

const reviewModel = mongoose.model("review", reviewSchema);

module.exports={
    reviewModel
}