const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const USER_MODEL = require("./API/models/user.model");
const Routes = require("./API/routes/Routes");
// const Routs = require("./api/routes/Router");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", Routes);

const mongooseLink =
  "mongodb+srv://malekkbh:123456780@cluster0.fju39hf.mongodb.net/";
// module.exports = app;

app.get("/app", (req, res) => {
  res.status(200).json({
    name: "anas",
    age: 20,
  });
});
// http://localhost:8000/whatsMyName
app.post("/whatsMyName", (req, res) => {
  const { name, lastName } = req.body;

  if (!name || !lastName) {
    res.status(701).json({
      error: true,
      errorMessage: "name and last name are MUST!",
    });

    return;
  }

  res.status(200).json({
    fullName: name + " " + lastName,
  });
});

app.post("/ceateNewUser", (req, res) => {
  const { phone, name, age, points, userName, pass } = req.body;

  USER_MODEL.create({
    phone: phone,
    name: name,
    age,
    points,
    userName,
    pass,
  })
    .then((createRes) => {
      res.status(200).json({
        user: createRes._doc,
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: true,
        errorMessage: e.message,
      });
    });
});

app.get("/getAllUsers", (req, res) => {
  USER_MODEL.find()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((e) =>
      res.status(500).json({ error: true, errorMessage: e.message })
    );
});

mongoose.connect(mongooseLink);

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

// app.use("/", Routs);

module.exports = app;
