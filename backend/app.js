const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();

const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const PORT = process.env.PORT || 5000;

const app = express();

const cors = require("cors");

//middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": [
        "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS",
      ],
    },
    allowedHeaders: ["sessionId", "Content-Type"],
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

//Routes
app.use("/courses", courseRoute);
app.use("/category", categoryRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success heroku and node",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
