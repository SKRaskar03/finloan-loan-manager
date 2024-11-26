const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Routes = require("./routes/app.routes");

mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://127.0.0.1:27017/civilloan")
    .then(() => {
        console.log("Connected to MongoDB Database!!!");
    })
    .catch((err) => {
        console.log("Could not connect to Database! Error - ", err);
        process.exit(1);
    });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use(Routes);

let PORT = 8080;
app.listen(8080, () => {
    console.log(`Server started at ${PORT}`);
});
