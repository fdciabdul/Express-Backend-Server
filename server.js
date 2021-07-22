const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;
const wilayah = require("./router/wilayah");
const agama = require("./router/agama");
const asset = require("./router/asset");
const pendidikan = require("./router/pendidikan");
const penduduk = require("./router/penduduk");
const penghasilan = require("./router/penghasilan");
const user = require("./router/user");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", wilayah);
app.use("/", agama);
app.use("/", wilayah);
app.use("/", pendidikan);
app.use("/", penduduk);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  