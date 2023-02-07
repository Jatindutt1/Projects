const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please enter product name."],
  },
  description: {
    type: String,
    require: [true, "please enter product description."],
  },
  price: {
    type: Number,
    require: [true, "please enter product price."],
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
    require:[true,"please add category"],
  },
  stock:{
    type:Number,
    require:[true,"please enter product stock"],
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
            require:true,
        },
        rating:{
            type:Number,
            require:true,
        },
        comment:{
            type:String,
            require:true,
        }
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("product",productSchema)
