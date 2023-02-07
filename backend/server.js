const app = require("./app");

const dotenv =require("dotenv");
const connectDatabase =require("./config/database")  //database export


//config
dotenv.config({path:"backend/config/config.env"});

//connecting with database
connectDatabase()


app.listen(process.env.PORT,()=>{
    console.log(`server is start on http://localhost:${process.env.PORT}`)
})