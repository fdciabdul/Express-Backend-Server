var express = require("express");
var router = express.Router();
const db = require("../db/db");
router.post("/api/penduduk/", async (req, res) => {
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
      const inidb = await db.tambahPenduduk(
        req.body.NIK,
        req.body.NoKK,
        req.body.Nama,
        req.body.JenisKelamin,
        req.body.IdDesa,
        req.body.Alamat,
        req.body.TglLahir,
        req.body.TempatLahir ,
        req.body.IdAgama ,
        req.body.NoHP ,
        req.body.Email ,
        req.body.Facebook,
        req.body.Instagram,
        req.body.Twitter,
        req.body.Foto 
      );
      let result = [];
      result.push({
        success: true,
        message: "Berhasil Simpan",
        data: [
          {
        NIK: req.body.NIK,
        NoKK: req.body.NoKK,
        Nama: req.body.Nama,
        JenisKelamin: req.body.JenisKelamin,
        IdDesa: req.body.IdDesa,
        Alamat: req.body.Alamat,
        TglLahir: req.body.TglLahir,
        TempatLahir: req.body.TempatLahir,
        IdAgama: req.body.IdAgama,
        NoHP: req.body.NoHP,
        Email: req.body.Email,
        Facebook: req.body.Facebook,
        Instagram: req.body.Instagram,
        Twitter: req.body.Twitter,
        Foto: req.body.Foto
          },
        ],
      });
      res.json(result);
    }
  

});

router.put("/api/penduduk/:id", async (req, res) => {
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
      const inidb = await db.updatePenduduk(req.params["id"],
     req.body.NoKK,
      req.body.Nama,
      req.body.JenisKelamin,
      req.body.IdDesa,
      req.body.Alamat,
      req.body.TglLahir,
      req.body.TempatLahir ,
      req.body.IdAgama ,
      req.body.NoHP ,
      req.body.Email ,
      req.body.Facebook,
      req.body.Instagram,
      req.body.Twitter,
      req.body.Foto );
      let result = [];
      result.push({
        success: true,
        message: "Berhasil Simpan",
        data:[
            {
          NIK: req.body.NIK,
          NoKK: req.body.NoKK,
          Nama: req.body.Nama,
          JenisKelamin: req.body.JenisKelamin,
          IdDesa: req.body.IdDesa,
          Alamat: req.body.Alamat,
          TglLahir: req.body.TglLahir,
          TempatLahir: req.body.TempatLahir,
          IdAgama: req.body.IdAgama,
          NoHP: req.body.NoHP,
          Email: req.body.Email,
          Facebook: req.body.Facebook,
          Instagram: req.body.Instagram,
          Twitter: req.body.Twitter,
          Foto: req.body.Foto
            },
          ],
      });
      res.json(result);
    }
  
    // res.send("ok")
  });
router.get("/api/penduduk/:id", async (req, res) => {
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
      const inidb = await db.cariPenduduk(
        req.params['id']
       
      );
      let result = [];
      result.push({
        success: true,
        message: "Berhasil Simpan",
        data:  inidb
      });
      res.json(result);
    }
  

});

router.get("/api/tampil/penduduk/all", async (req, res) => {
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
    const inidb = await db.tampilPenduduk();
 
    //  console.log(result);
    const fails = {
      success: false,
      message: "Data tidak ditemukan",
      data : inidb,
    };
    let result = [
        {
          success: true,
          message: "Berhasil Tampil",
          data: inidb,
        },
      ];
    //  console.log(result);
    if (inidb.length < 1) {
      res.json(fails);
    } else {
      res.json(result);
    }
}
  });

  
//hapus data PENDUDUK
router.delete("/api/penduduk/:id", async (req, res) => {
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
