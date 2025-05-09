const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const shared = require("./sharedState");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});
let abs_member = null;
let admin = false;
// Middleware to check if the user is logged in
router.use((_, res, next) => {
  res.locals.abs_member = abs_member;
  next();
});
router.use((_, res, next) => {
  res.locals.admin = admin;
  res.locals.upevent_id = shared.upevent_id;
  res.locals.event_id = shared.event_id;
  res.locals.preEvent_id = shared.preEvent_id;
  next();
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
      shared.admin = true;
      return res.redirect("/");
    }

    const memberQuery = `SELECT * FROM Member WHERE email = ? AND password = ?`;

    connection.query(memberQuery, [email, password], (err, memberResults) => {
      if (err) {
        console.error("Member login error:", err);
        return res.status(500).send("Server error");
      }

      if (memberResults.length > 0) {
        abs_member = memberResults[0].member_id;
        shared.abs_member = abs_member;
        shared.member_status = memberResults[0].status;
        return res.redirect(`/`);
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

router.post("/signup", (req, res) => {
  const {
    name,
    student_id,
    dept_name,
    skill,
    email,
    password,
    confirm_password,
    payment_method,
    expectation,
    hometown,
    phone_number,
    transaction_id,
    why_hire,
  } = req.body;
  let q1 = `select payment_id from Payment where transaction_id = "${transaction_id}" and payment_method = "${payment_method}";`;
  let status = "pending";
  try {
    connection.query(q1, (err, payment_result) => {
      if (err) throw err;
      if (payment_result.length > 0) {
        status = "active";
      }
      let payment_id = payment_result[0].payment_id;

      let q2 = `insert into Member(name,student_id,dept_name,phone_number,email,hometown,skill,expectation,why_hire,status,password,confirm_password,join_date) values('${name}','${student_id}','${dept_name}','${phone_number}','${email}','${hometown}','${skill}','${expectation}','${why_hire}','${status}','${password}','${confirm_password}',now());`;
      try {
        connection.query(q2, (err, result) => {
          if (err) throw err;
          let q3 = `delete from Payment where payment_id = ${payment_id};`;
          try {
            connection.query(q3, (err, _) => {
              if (err) throw err;
              res.redirect("/login");
            });
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//route to profile
router.get("/profile", (req, res) => {
  let id = req.query.id || abs_member;
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

//route to logout
router.get("/logout", (req, res) => {
  abs_member = null;
  admin = false;
  res.redirect("/");
});

module.exports = {
  router,
  abs_member,
  admin,
};
