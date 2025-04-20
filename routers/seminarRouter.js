const express = require("express");
const mysql = require("mysql2");

const seminarRouter = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});
//details of the first seminar
seminarRouter.get("/seminars", (req, res) => {
  let q = "SELECT * FROM Seminar order by session_id desc";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let seminar = result[0];
      res.render("home/seminar/seminarOverview.ejs", { seminar });
    });
  } catch (error) {}
});

//route to create seminar
seminarRouter.get("/seminars/new", (req, res) => {
  res.render("home/seminar/createSeminar.ejs");
});

seminarRouter.post("/seminars", (req, res) => {
  let { session_type, description, counseling_link, time, date } = req.body;
  let q = `insert into Seminar (date, time, session_type, description, counseling_link) values('${date}','${time}','${session_type}','${description}','${counseling_link}');`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/seminars");
    });
  } catch (error) {
    console.log(err);
  }
});

//move to edit route
seminarRouter.get("/seminars/:id/edit", (req, res) => {
  let id = req.params.id;
  let q = `SELECT * FROM Seminar WHERE session_id = ${id}`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let seminar = result[0];
      res.render("home/seminar/updateSeminar.ejs", { seminar });
    });
  } catch (error) {
    console.log(error);
  }
});

seminarRouter.put("/seminars/:id", (req, res) => {
  let { session_type, description, counseling_link, time, date } = req.body;
  let id = req.params.id;
  let q = `UPDATE Seminar SET date = '${date}', time = '${time}', session_type = '${session_type}', description = '${description}', counseling_link = '${counseling_link}' WHERE session_id = ${id}`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect(`/seminars`);
    });
  } catch (error) {
    console.log(error);
  }
});

//delete route

seminarRouter.delete("/seminars/:id/delete", (req, res) => {
  let id = req.params.id;
  let q = `DELETE FROM Seminar WHERE session_id = ${id}`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect("/seminars");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = seminarRouter;
