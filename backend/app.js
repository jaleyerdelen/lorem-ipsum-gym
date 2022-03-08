const express = require("express");
const mongoose = require("mongoose");
const courseRoute = require("./routes/courseRoute");

const PORT = process.env.PORT || 5000;

const app = express();

const cors = require("cors");

//middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Routes
app.use("/courses", courseRoute);

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

app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "we did it" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
