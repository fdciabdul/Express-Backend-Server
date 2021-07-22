const mysql = require("mysql2/promise");
var format = require("date-format");
// const foreach = require("../controller")
async function foreach(arr, func) {
  for (var i in arr) {
    // await delay(2000);

    func(i, arr[i]);
  }
}
const createConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dam",
  });
};

/**
 * Function daftar
 * @date 2021-07-21
 * @param {any} id=NULL
 * @param {any} nama
 * @param {any} jeniskelamin
 * @param {any} email
 * @param {any} nohp
 * @param {any} username
 * @param {any} password
 * @param {any} foto
 * @param {any} token
 * @returns {any}
 */
// function User
const validasiToken = async (token) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(
    `SELECT * FROM 
    user WHERE Token='${token}'`
  );

  if (rows.length < 1) return false;
  return true;
};
const daftar = async (
  id = "NULL",
  nama,
  jeniskelamin,
  email,
  nohp,
  username,
  password,
  foto,
  token
) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(
    `INSERT INTO 
    user (
        IdUser, Nama, JenisKelaman, 
    Email, NoHP, Username, 
    Password, Foto, Token) 
    VALUES (NULL, 
        '${nama}', 
    '${jeniskelamin}', 
    '${email}',
     '${nohp}', 
     '${username}', '${password}', '${foto}', '${token}');`
  );

  return rows;
};

// function database untuk wilayah

const provinsi = async () => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`SELECT * from provinsi`);
  return rows;
};
const IdKabupatenfromprovinsi = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM kabupaten WHERE IdProvinsi='${id}'`);
  return rows;
};
const getKecamatan = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM kecamatan WHERE IdKabupaten='${id}'`);
  return rows;
};
const getDesa = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM desa WHERE IdKecamatan='${id}'`);
  return rows;
};

// function db untuk agama
const tambahAgama = async (id = "NULL", nama) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  INSERT INTO agama (IdAgama, NamaAgama) VALUES ('${id}', '${nama}');`);
  return rows;
};

const updateAgama = async (id, nama) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  UPDATE agama SET NamaAgama = '${nama}' WHERE IdAgama=${id};`);
  if (!id) return false;
  return rows;
};
const cariAgama = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM agama WHERE IdAgama='${id}'`);
  if (!id) return false;
  return rows;
};

const tampilAgama = async () => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM agama`);
  return rows;
};
const hapusAgama = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  DELETE FROM agama WHERE IdAgama = ${id}`);
  return rows;
};

// function database untuk pendidikan
const tambahPendidikan = async (
  id = "NULL",
  nik,
  namapendidikan,
  awalTahun,
  AkhirTahun
) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  INSERT INTO pendidikan
   (IdPendidikan, NIK , NamaPendidikan , AwalTahun , AkhirTahun)
   VALUES ('${id}', '${nik}', '${namapendidikan}', '${awalTahun}', '${AkhirTahun}');
   
   `);
  return rows;
};
const updatePendidikan = async (
  id,
  NIK,
  NamaPendidikan,
  AwalTahun,
  AkhirTahun
) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  UPDATE pendidikan SET NIK='${NIK}',NamaPendidikan='${NamaPendidikan}',AwalTahun='${AwalTahun}', AkhirTahun='${AkhirTahun}' WHERE IdPendidikan=${id};`);
  if (!id) return false;
  return rows;
};

const cariPendidikan = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM pendidikan WHERE IdPendidikan='${id}'`);
  if (!id) return false;
  return rows;
};
const tampilPendidikan = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM pendidikan WHERE NIK='${id}'`);
  if (!id) return false;
  return rows;
};

const hapusPendidikan = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  DELETE FROM pendidikan WHERE IdPendidikan =${id}`);
  if (!id) return false;
  return rows;
};


// fungsi penduduk db

const tambahPenduduk = async (
  NIK,
  NoKK,
  Nama,
  JenisKelamin,
  IdDesa,
  Alamat,
  TglLahir,
  TempatLahir,
  IdAgama,
  NoHP,
  Email,
  Facebook,
  Instagram,
  Twitter,
  Foto,
  TanggalData
) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  INSERT INTO penduduk (NIK ,NoKK,
    Nama,
    JenisKelamin,
    IdDesa,
    Alamat,
    TglLahir,
    TempatLahir ,
    IdAgama ,
    NoHP ,
    Email ,
    Facebook,
    Instagram,
    Twitter,
    Foto , TanggalData) VALUES 
    ('${NIK}', '${NoKK}', '${Nama}', '${JenisKelamin}', '${IdDesa}', 
    '${Alamat}', '${TglLahir}', '${TempatLahir}', '${IdAgama}',
     '${NoHP}', '${Email}', '${Facebook}', '${Instagram}',
      '${Twitter}', '${Foto}','${TanggalData}');`);

  return rows;
};

const cariPenduduk = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM penduduk WHERE NIK=${id}`);
  if (!id) return false;
  return rows;
};

const tampilPenduduk = async () => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM penduduk`);
  return rows;
};
const updatePenduduk = async (
  NIK,
  NoKK,
  Nama,
  JenisKelamin,
  IdDesa,
  Alamat,
  TglLahir,
  TempatLahir,
  IdAgama,
  NoHP,
  Email,
  Facebook,
  Instagram,
  Twitter,
  Foto,
  TanggalData
) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  UPDATE penduduk SET 
  NoKK = '${NoKK}',
   Nama = '${Nama}',
   JenisKelamin = '${JenisKelamin}', 
   IdDesa = '${IdDesa}',
    Alamat = '${Alamat}', 
    TglLahir = '${TglLahir}', 
    TempatLahir = '${TempatLahir}',
     IdAgama = '${IdAgama}', 
     NoHP = '${NoHP}', 
     Email = '${Email}', 
     Facebook = '${Facebook}',
      Instagram = '${Instagram}', 
      Twitter = '${Twitter}',
       Foto = '${Foto}' WHERE penduduk.NIK = '${NIK}';`);
  return rows;
};
const hapusPenduduk = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  DELETE FROM penduduk WHERE NIK =${id}`);
  if (!id) return false;
  return rows;
};


// fungsi Pengahasilan

const tambahPengahasilan = async (IdPenghasilan = "NULL", NIK , NamaAsset ,Harga , Jumlah) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  INSERT INTO asset (IdPenghasilan, NIK, Penghasilan,Nominal, Satuan) VALUES (NULL, '${NIK}', '${NamaAsset}', '${Harga}', '${Jumlah}');`);
  return rows;
};

const updatePengahasilan = async (id, nama,harga , jumlah) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  UPDATE asset SET NIK = '${nama}',Penghasilan = '${harga}',Nominal = '${jumlah}',Satuan = '${jumlah}' WHERE IdAsset=${id};`);
  if (!id) return false;
  return rows;
};

const cariPengahasilan = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM asset WHERE IdAsset='${id}'`);
  if (!id) return false;
  return rows;
};

const tampilPengahasilan = async () => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM asset`);
  return rows;
};
const hapusPengahasilan = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  DELETE FROM asset WHERE IdAsset = ${id}`);
  return rows;
};

//fungsi database Asset
const tambahAsset = async (id = "NULL", nama) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  INSERT INTO asset (IdAsset, NIK, NamaAsset,Harga, Jumlah) VALUES (NULL, '${NIK}', '${NamaAsset}', '${Harga}', '${Jumlah}');`);
  return rows;
};

const updateAsset= async (id, nama) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  UPDATE asset SET NamaAsset = '${nama}',Harga = '${harga}',Jumlah = '${jumlah}' WHERE IdAsset=${id};`);
  if (!id) return false;
  return rows;
};
const cariAsset = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM asset WHERE IdAsset='${id}'`);
  if (!id) return false;
  return rows;
};

const tampilAsset = async () => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  SELECT * FROM asset`);
  return rows;
};
const hapusAsset = async (id) => {
  const connection = await createConnection();

  const [rows] = await connection.execute(`
  DELETE FROM asset WHERE IdAsset = ${id}`);
  return rows;
};

// EXPORT SEMUA FUNGSI
module.exports = {
  foreach,
  createConnection,
  //export user
  validasiToken,
  daftar,
  // export wilayah
  provinsi,
  getKecamatan,
  getDesa,
  IdKabupatenfromprovinsi,
  // export agama
  tambahAgama,
  updateAgama,
  cariAgama,
  tampilAgama,
  hapusAgama,

  //export pendidikan
  tambahPendidikan,
  updatePendidikan,
  cariPendidikan,
  tampilPendidikan,
  hapusPendidikan,

  // export penduduk
  tambahPenduduk,
  updatePenduduk,
  cariPenduduk,
  tampilPenduduk,
  hapusPenduduk,

  // export pengahasilan
  tambahPengahasilan,
  updatePengahasilan,
  cariPengahasilan,
  tampilPengahasilan,
  hapusPengahasilan
};
