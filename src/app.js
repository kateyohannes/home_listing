require("dotenv").config()
require("./config/mongoose")()
const morgan = require("morgan");
const http = require("node:http");
const express = require("express");

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const partnerRouter = require("./routes/partner.route")
const homeRouter = require("./routes/home.route")

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "It's working"
    })
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/home", homeRouter);
app.use("/partner", partnerRouter);

const server = http.createServer(app)
const port = process.env.PORT || 3000

server.listen(port, ()=>{
    console.log(`server is on ${port}`);
});