const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});

router.get("/", (req, res) => {
  let q = `select * from Company;`;
  try {
    connection.query(q, (err, companies) => {
      if (err) throw err;
      res.render("home/user/index.ejs", { companies });
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/login", (req, res) => {
  res.render("home/user/login.ejs");
});
router.get("/signup", (req, res) => {
  res.render("home/user/signup.ejs");
});
router.get("/profile", (req, res) => {
  res.render("home/user/profile.ejs");
});
router.get("/editprofile", (req, res) => {
  res.render("home/user/editprofile.ejs");
});

module.exports = router;
