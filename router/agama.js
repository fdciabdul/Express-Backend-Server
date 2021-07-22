var express = require("express");
var router = express.Router();
const db = require("../db/db");

// route tambah agama
router.post("/api/agama/", async (req, res) => {
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
    const inidb = await db.tambahAgama("", req.body.nama);
    let result = [];
    result.push({
      success: true,
      message: "Berhasil Simpan",
      data: [
        {
          IdAgama: inidb.insertId,
          NamaAgama: req.body.nama,
        },
      ],
    });
    res.json(result);
  }

  // res.send("ok")
});

// Router update agama
router.put("/api/agama/:id", async (req, res) => {
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
    const inidb = await db.updateAgama(req.params["id"], req.body.nama);
    let result = [];
    result.push({
      success: true,
      message: "Berhasil Simpan",
      data: [
        {
          IdAgama: req.params["id"],
          NamaAgama: req.body.nama,
        },
      ],
    });
    res.json(result);
  }

  // res.send("ok")
});
// route cari data agama
router.get("/api/agama/:id", async (req, res) => {
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
    const inidb = await db.cariAgama(req.params["id"]);
    if (inidb == false) {
      res.send("false");
    } else {
      let result = [];
      result.push({
        success: true,
        message: "Berhasil Simpan",
        data: [
          {
            IdAgama: inidb[0].IdAgama,
            NamaAgama: inidb[0].NamaAgama,
          },
        ],
      });
      res.json(result);
    }
  }

  // res.send("ok")
});
// tampil data agama
router.get("/api/tampil/agama/", async (req, res) => {
  let result = [
    {
      success: true,
      message: "Berhasil Tampil",
      data: [],
    },
  ];
  const inidb = await db.tampilAgama();
  inidb.forEach((element) => {
    result[0].data.push({
      IdAgama: element.IdAgama,
      NamaAgama: element.NamaAgama,
    });
  });
  //  console.log(result);
  const fails = {
    success: false,
    message: "Data tidak ditemukan",
  };
  //  console.log(result);
  if (inidb.length < 1) {
    res.json(fails);
  } else {
    res.json(result);
  }
});

//hapus data agama
router.delete("/api/agama/:id", async (req, res) => {
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
    const inidb = await db.hapusAgama(req.params["id"]);
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
