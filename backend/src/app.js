const express = require("express")
const app = express();
const userRouter = require("./routes/userRoute")
const profileRouter = require("./routes/profileRoute");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser())
app.use("/api/user",userRouter )
app.use("/api/profile",profileRouter)


module.exports = app