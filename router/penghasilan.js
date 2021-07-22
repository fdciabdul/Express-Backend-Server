var express = require("express");
var router = express.Router();
const db = require("../db/db");
router.post("/api/penghasilan/", async (req, res) => {
    const token = await db.validasiToken(req.headers.authorization);
  // console.log(req.headers.authorization +"== "+ token[0].Token)

  if (!req.headers.authorization) {
    let datakosong = [
      {
        success: false,
        message: "Key kosong",
      },
    ];
    res.send(datakosong);
  } else if (token == false) {
    let keysalah = [
      {
        success: false,
        message: "Key Salah",
      },
    ];
    res.send(keysalah);
  } else {
    const inidb = await db.tambahPengahasilan(
      "",
      req.body.NIK,
      req.body.Penghasilan,
      req.body.Nominal,
      req.body.Satuan
    );
    let result = [];
    result.push({
      success: true,
      message: "Berhasil Simpan",
      data: [
        {
          IdPendidikan: req.body.IdPendidikan,
          NIK: req.body.NIK,
          NamaPendidikan: req.body.NamaPendidikan,
          AwalTahun: req.body.AwalTahun,
          AkhirTahun: req.body.AkhirTahun,
        },
      ],
    });
    res.json(result);
  }

});

module.exports = router;
