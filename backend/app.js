const express = require('express')

const PORT = process.env.PORT || 5000;

const app = express();

 const cors = require('cors')

app.use(cors());

app.get("/", (req, res) => {
    res.send({message: "we did it"})
})

app.listen(PORT, () =>{
    console.log(`Server listening on ${PORT}`);
});