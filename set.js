const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors")
app.use(cors())

app.use(bodyParser.json());

app.post("/text2img", (req, res) => {
  const data = req.body;
  const url = "https://brave-sheep-feel-34-90-18-192.loca.lt/text2img";

  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => console.error(error));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
