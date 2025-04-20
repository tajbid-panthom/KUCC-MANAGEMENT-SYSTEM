const express = require("express");

const mysql = require("mysql2");

const mentorRouter = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});

//all data reading route
mentorRouter.get("/mentors", (req, res) => {
  let q = `select * from Mentor order by mentor_id desc;`;
  try {
    connection.query(q, (err, mentors) => {
      if (err) {
        throw err;
      }
      res.render("home/mentor/mentorOverview.ejs", { mentors });
    });
  } catch (error) {
    console.log(error);
  }
});

//view route
mentorRouter.get("/mentors/:id/view", (req, res) => {
  let id = req.params.id;
  let q = `select * from Mentor where mentor_id = ${id};`;
  try {
    connection.query(q, (err, mentors) => {
      if (err) throw err;
      let mentor = mentors[0];
      res.render("home/mentor/mentorDetails.ejs", { mentor });
    });
  } catch (error) {
    console.log(error);
  }
});

//route to create mentor
mentorRouter.get("/mentors/new", (req, res) => {
  res.render("home/mentor/createMentor.ejs");
});
//delete mentor
mentorRouter.delete("/mentors/:id/delete", (req, res) => {
  let id = req.params.id;
  let q = `delete from Mentor where mentor_id = ${id};`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect("/mentors");
    });
  } catch (error) {
    console.log(error);
  }
});

//create route
mentorRouter.post("/mentors", (req, res) => {
  let { mentor_name, qualification, description, email } = req.body;
  let q = `insert into Mentor (mentor_name, qualification, email,description) values ('${mentor_name}', '${qualification}', '${email}','${description}');`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect("/mentors");
    });
  } catch (error) {
    console.log(error);
  }
});

//edit route
mentorRouter.get("/mentors/:id/edit", (req, res) => {
  let id = req.params.id;
  let q = `select * from Mentor where mentor_id = ${id};`;
  try {
    connection.query(q, (err, mentors) => {
      if (err) throw err;
      let mentor = mentors[0];
      res.render("home/mentor/updateMentor.ejs", { mentor });
    });
  } catch (error) {
    console.log(error);
  }
});

//update route
mentorRouter.put("/mentors/:id/view", (req, res) => {
  let id = req.params.id;
  let { mentor_name, qualification, description, email } = req.body;
  let q1 = `select * from Mentor where mentor_id = ${id};`;

  try {
    connection.query(q1, (err, _) => {
      if (err) throw err;
      let q2 = `update Mentor set mentor_name = '${mentor_name}', qualification = '${qualification}',email = '${email}', description='${description}' where mentor_id = '${id}'`;
      connection.query(q2, (err, result) => {
        if (err) throw err;
        res.redirect(`/mentors/${id}/view`);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mentorRouter;
