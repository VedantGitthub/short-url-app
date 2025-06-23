const express = require("express");
const {connectToMongoDB} = require("./connection");
const path = require("path");
const URL = require("./model/url");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly,checkAuth} = require("./middleware/auth")

//routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected"));

//view
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware for parsing json body
app.use(express.json());
//middleware for passing form data in html
app.use(express.urlencoded({extended:false}));
//middleware for auth using cookies
app.use(cookieParser());



//routing
app.use("/api",restrictToLoggedinUserOnly, urlRoute); //this middleware ensures that this route can only be accessed if the user is logged in 
app.use('/',checkAuth, staticRoute);
app.use("/user", userRoute);



//starting server to listen
app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`));
