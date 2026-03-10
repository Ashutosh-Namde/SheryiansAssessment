const express = require("express")
const app = express();
const userRouter = require("./routes/userRoute")
const profileRouter = require("./routes/profileRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use("/api/user",userRouter )
app.use("/api/profile",profileRouter)


module.exports = app