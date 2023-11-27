const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user_id: {type:String, required:true},
    username: {type:String, required:true},
    cart_books: {type: Array, required:true},
},{
    versionKey:false
})

const cartModel = mongoose.model("cart", cartSchema);

module.exports={
    cartModel
}