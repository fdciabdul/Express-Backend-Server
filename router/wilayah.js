var express = require("express");
var router = express.Router();
const db = require("../db/db");

/**
 * Get kecamatan provinsi parameter id
 * @date 2021-07-21
 * @param {any} "/api/wilayah/provinsi"
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
router.get("/api/wilayah/provinsi", async (req, res) => {
  let result = [
    {
      success: true,
      message: "Berhasil Tampil",
      data: [],
    },
  ];
  const inidb = await db.provinsi();
  inidb.forEach((element) => {
    result[0].data.push({
      IdProvinsi: element.IdProvinsi,
      NamaKabupaten: element.NamaProvinsi,
    });
  });
  //  console.log(result);
  const fails =  {
    "success": false,
    "message": "Data tidak ditemukan"
    }
  //  console.log(result);
  if(inidb.length < 1) {
    res.json(fails); 
  }else{
  res.json(result);  
  }
});

/**
 * Get kecamatan kabupaten parameter id
 * @date 2021-07-21
 * @param {any} "/api/wilayah/kabupaten/:id"
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
router.get("/api/wilayah/kabupaten/:id", async (req, res) => {
    let result = [
        {
          success: true,
          message: "Berhasil Tampil",
          data: [],
        },
      ];
      const inidb = await db.IdKabupatenfromprovinsi(req.params['id']);
      inidb.forEach((element) => {
        result[0].data.push({
        IdKabupaten: element.IdKabupaten,
          IdProvinsi: element.IdProvinsi,
          NamaKabupaten: element.NamaKabupaten,
        });
      });
     const fails =  {
        "success": false,
        "message": "Data tidak ditemukan"
        }
      //  console.log(result);
      if(inidb.length < 1) {
        res.json(fails); 
      }else{
      res.json(result);  
      }
});

/**
 * Get kecamatan berdasarkan parameter id
 * @date 2021-07-21
 * @param {any} "/api/wilayah/kecamatan/:id"
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
router.get("/api/wilayah/kecamatan/:id", async (req, res) => {

    let result = [
        {
          success: true,
          message: "Berhasil Tampil",
          data: [],
        },
      ];
      const inidb = await db.getKecamatan(req.params['id']);
      inidb.forEach((element) => {
        result[0].data.push({
            IdKecamatan: element.IdKecamatan,
            IdKabupaten: element.IdKabupaten,
            NamaKecamatan: element.NamaKecamatan,
        });
      });
      //  console.log(result);
      const fails =  {
        "success": false,
        "message": "Data tidak ditemukan"
        }
      //  console.log(result);
      if(inidb.length < 1) {
        res.json(fails); 
      }else{
      res.json(result);  
      }
});

/**
 * Get kecamatan desa parameter id
 * @date 2021-07-21
 * @param {any} "/api/wilayah/desa/:id"
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */

router.get("/api/wilayah/desa/:id", async (req, res) => {
    let result = [
        {
          success: true,
          message: "Berhasil Tampil",
          data: [],
        },
      ];
      const inidb = await db.getDesa(req.params['id']);
      inidb.forEach((element) => {
        result[0].data.push({
            IdDesa: element.IdDesa,
            IdKecamatan: element.IdKecamatan,
            NamaDesa: element.NamaDesa,
        });
      });
      //  console.log(result);
      const fails =  {
        "success": false,
        "message": "Data tidak ditemukan"
        }
      //  console.log(result);
      if(inidb.length < 1) {
        res.json(fails); 
      }else{
      res.json(result);  
      }
});

module.exports = router;
