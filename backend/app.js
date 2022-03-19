const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const loginRoute = require("./routes/loginRoute");

const PORT = process.env.PORT || 5000;

const app = express();

const cors = require("cors");

//middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  cors({
    origin: "*",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": [
        "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS",
      ],
    },
  })
);

mongoose
  .connect(
    "mongodb+srv://jale:9876598765@cluster0.g8s8b.mongodb.net/lorem-ipsum-gym?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      //useCreateIndex: true
    }
  )
  .then(() => {
    console.log("DB Connect success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
  })
);

//Routes
app.use("/courses", courseRoute);
app.use("/category", categoryRoute);
app.use("/users", userRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send({ message: "we did it" });
});

app.get("/category", (req, res) => {
  res.send({ category: "yeey" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
