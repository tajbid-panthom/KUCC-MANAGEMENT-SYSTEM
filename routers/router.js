const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});
//all indexing
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
//route to login page
router.get("/login", (req, res) => {
  res.render("home/user/login.ejs");
});

//login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const adminQuery = `SELECT * FROM Admin WHERE email = ? AND password = ?`;

  connection.query(adminQuery, [email, password], (err, adminResults) => {
    if (err) {
      console.error("Admin login error:", err);
      return res.status(500).send("Server error");
    }

    if (adminResults.length > 0) {
      return res.redirect("/admin");
    }

    const memberQuery = `SELECT * FROM Member WHERE email = ? AND password = ?`;

    connection.query(memberQuery, [email, password], (err, memberResults) => {
      if (err) {
        console.error("Member login error:", err);
        return res.status(500).send("Server error");
      }

      if (memberResults.length > 0) {
        return res.redirect(`/profile?id=${memberResults[0].member_id}`);
      } else {
        return res.redirect("/login?error=invalid");
      }
    });
  });
});

//route to signup
router.get("/signup", (req, res) => {
  res.render("home/user/signup.ejs");
});

//route to profile
router.get("/profile", (req, res) => {
  let id = req.query.id;
  let q = `select * from Member where member_id=${id};`;
  try {
    connection.query(q, (err, member) => {
      if (err) throw err;
      res.render("home/user/profile.ejs", { member: member[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

//route to profile edit
router.get("/profile/edit", (req, res) => {
  let id = req.query.id;
  let q = `select * from Member where member_id=${id};`;
  try {
    connection.query(q, (err, member) => {
      if (err) throw err;
      res.render("home/user/editprofile.ejs", { member: member[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

//update profile
router.put("/profile/:id", (req, res) => {
  let { id } = req.params;
  let { name, student_id, dept_name, phone_number, email, hometown } = req.body;

  let q1 = `SELECT * FROM Member WHERE member_id = ${id};`;
  try {
    connection.query(q1, (err, _) => {
      if (err) throw err;
      let q2 = `update Member
      set 
          name = '${name}',
          student_id = '${student_id}',
          dept_name = '${dept_name}',
          phone_number = '${phone_number}',
          email = '${email}',
          hometown = '${hometown}'
      where member_id = ${id};`;
      try {
        connection.query(q2, (err, _) => {
          if (err) throw err;
          res.redirect(`/profile?id=${id}`);
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//route to update profile
router.get("/admin", (req, res) => {
  let q = `select name,email from Admin;`;
  try {
    connection.query(q, (err, admin) => {
      if (err) throw err;
      res.render("home/user/admin.ejs", { admin: admin[0] });
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
