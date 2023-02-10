const express = require("express");
const errorMiddleware = require("./middleware/error")

const app = express();
app.use(express.json());

//routes import
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1",product);
app.use("/api/v1",user);

app.use(errorMiddleware)

//middleware for error


module.exports = app;
