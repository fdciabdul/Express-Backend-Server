var express = require("express");
var router = express.Router();
const db = require("../db/db");
router.post("/api/pendidikan", async (req, res) => {
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
    const inidb = await db.tambahPendidikan(
      req.body.IdPendidikan,
      req.body.NIK,
      req.body.NamaPendidikan,
      req.body.AwalTahun,
      req.body.AkhirTahun
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

  // res.send("ok")
});

// router ubah data

router.put("/api/pendidikan/:id", async (req, res) => {
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
      const inidb = await db.updatePendidikan(
          req.params["id"], req.body.NIK,
      req.body.NamaPendidikan,
      req.body.AwalTahun,
      req.body.AkhirTahun)
      let result = [];
      result.push({
        success: true,
        message: "Berhasil Simpan",
        data: [
            {
              IdPendidikan:  req.params["id"],
              NIK: req.body.NIK,
              NamaPendidikan: req.body.NamaPendidikan,
              AwalTahun: req.body.AwalTahun,
              AkhirTahun: req.body.AkhirTahun,
            },
          ],
      });
      res.json(result);
    }
  
    // res.send("ok")
  });

  // router cari pendidikan
  router.get("/api/pendidikan/:id", async (req, res) => {
    const token = await db.validasiToken(req.headers.authorization);
  
  
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
      const inidb = await db.cariPendidikan(req.params["id"]);
      if (inidb == false) {
        res.send("false");
      } else {
        let result = [];
        result.push({
            success: true,
            message: "Berhasil Simpan",
            data: [
                {
                  IdPendidikan:  req.params["id"],
                  NIK: inidb[0].NIK,
                  NamaPendidikan: inidb[0].NamaPendidikan,
                  AwalTahun: inidb[0].AwalTahun,
                  AkhirTahun: inidb[0].AkhirTahun,
                },
              ],
          });
          res.json(result);
      }
    }
  
    // res.send("ok")
  });

  router.get("/api/pendidikan/all/:id", async (req, res) => {
    const token = await db.validasiToken(req.headers.authorization);
  
  
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
      const inidb = await db.tampilPendidikan(req.params["id"]);
      if (inidb == false) {
        res.send("false");
      } else {
        let result = [];
        result.push({
            success: true,
            message: "Berhasil Simpan",
            data: [
                {
                  IdPendidikan:  inidb[0].IdPendidikan,
                  NIK: req.params["id"],
                  NamaPendidikan: inidb[0].NamaPendidikan,
                  AwalTahun: inidb[0].AwalTahun,
                  AkhirTahun: inidb[0].AkhirTahun,
                },
              ],
          });
          res.json(result);
      }
    }
  
    // res.send("ok")
  })

  router.delete("/api/pendidikan/:id", async (req, res) => {
    const token = await db.validasiToken(req.headers.authorization);
  
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
      const inidb = await db.hapusPendidikan(req.params["id"]);
      if (inidb == false) {
        res.send("false");
      } else {
        let result = [];
        result.push({
          success: true,
          message: "Berhasil Dihapus"
        });
        res.json(result);
      }
    }
  
    // res.send("ok")
  });

module.exports = router;
