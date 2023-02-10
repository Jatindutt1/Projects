const mongoose = require("mongoose")

mongoose.set("strictQuery",false);
const connectDatabase =()=>{

    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log("connected")
        });
}

module.exports = connectDatabase