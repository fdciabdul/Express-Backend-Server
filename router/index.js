var express = require('express');
var router = express.Router();
const db = require("../db/db");
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
router.get("/", async (req, res) => {
  res.send("Ping!")
});


module.exports = router;