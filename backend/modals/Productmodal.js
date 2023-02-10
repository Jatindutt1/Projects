const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name."],
  },
  description: {
    type: String,
    required: [true, "please enter product description."],
  },
  price: {
    type: Number,
    required: [true, "please enter product price."],
    maxLenght: [8, "please can not exceed 8 character"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
  category:{
    type:String,
    required:[true,"please add category"],
  },
  stock:{
    type:Number,
    required:[true,"please enter product stock"],
    default:1,
    
  },
  numOfReviews:{
    type:Number,
    default:0,

  },
  reviews:[
    {
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("product",productSchema)
