const express = require("express");
const mysql = require("mysql2");
const shared = require("./sharedState");

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
  let q2 = `select mentor_id from Conduction where session_id = ?`;
  let q3 = `select * from Mentor where mentor_id = ?`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let seminar = result[0];
      try {
        connection.query(q2, [seminar.session_id], (err2, results) => {
          if (err2) throw err2;
          let mentor_id = results[0].mentor_id;
          try {
            connection.query(q3, [mentor_id], (err3, mentors) => {
              if (err3) throw err3;
              res.render("home/seminar/seminarOverview.ejs", {
                seminar,
                mentor: mentors[0],
              });
            });
          } catch (error3) {
            console.log(error3);
          }
        });
      } catch (error2) {
        console.log(error2);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//route to create seminar
seminarRouter.get("/seminars/new", (req, res) => {
  let q = `select mentor_id,mentor_name from Mentor;`;
  try {
    connection.query(q, (err, mentors) => {
      if (err) throw err;
      res.render("home/seminar/createSeminar.ejs", { mentors });
    });
  } catch (error) {
    console.log(error);
  }
});

seminarRouter.post("/seminars", (req, res) => {
  const { session_type, mentor_id, description, counseling_link, time, date } =
    req.body;

  const insertSeminarQuery = `
    INSERT INTO Seminar (date, time, session_type, description, counseling_link)
    VALUES (?, ?, ?, ?, ?)
  `;
  const insertConductionQuery = `INSERT INTO Conduction (mentor_id, session_id) VALUES (?, ?)`;

  connection.query(
    insertSeminarQuery,
    [date, time, session_type, description, counseling_link],
    (err, result) => {
      if (err) {
        console.error("Insert Seminar Error:", err);
        return res.status(500).send("Failed to insert seminar");
      }

      // Get the last inserted session_id
      const seminar_id = result.insertId;

      connection.query(
        insertConductionQuery,
        [mentor_id, seminar_id],
        (err2, _) => {
          if (err2) {
            console.error("Insert Conduction Error:", err2);
            return res.status(500).send("Failed to assign mentor");
          }

          res.redirect("/seminars");
        }
      );
    }
  );
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
