const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});

const eventRouter = express.Router();

eventRouter.get("/currentevents", (req, res) => {
  let q = `select * from Event order by event_id desc;`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      res.render("home/event/eventOverview.ejs", { event: events[1] });
    });
  } catch (error) {
    console.log(error);
  }
});
eventRouter.get("/feedback", (req, res) => {
  res.render("home/event/feedback.ejs");
});
//route to certificate page
eventRouter.get("/certificate/:id", (req, res) => {
  let q = `select * from Event,Certificate where Event.event_id = Certificate.event_id and Certificate.event_id = ${req.params.id};`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      let q = `select * from Event,`;
      res.render("home/event/certificate.ejs", { event: events[0] });
    });
  } catch (error) {
    console.log(error);
  }
});
eventRouter.get("/currentevents/registration", (req, res) => {
  res.render("home/event/eventRegistration.ejs");
});

//route to create event page
eventRouter.get("/events/new", (req, res) => {
  res.render("home/event/createEvent.ejs");
});
//create event route
eventRouter.post("/currentevents", (req, res) => {
  let { title, venue, event_time, event_date, description } = req.body;
  let q = `insert into Event (title, description, venue, event_date, event_time) values ('${title}', '${description}', '${venue}', '${event_date}', '${event_time}');`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect("/currentevents");
    });
  } catch (error) {
    console.log(error);
  }
});

eventRouter.get("/currentevents/:id/details", (req, res) => {
  let q = `select * from Event where event_id = ${req.params.id};`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      res.render("home/event/eventDetails.ejs", { event: events[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

eventRouter.get("/currentevents/:id/details/edit", (req, res) => {
  let q = `select * from Event where event_id = ${req.params.id};`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      res.render("home/event/updateEvent.ejs", { event: events[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

//update route
eventRouter.put("/currentevents/:id/details", (req, res) => {
  let id = req.params.id;
  let { title, venue, event_time, event_date, description } = req.body;
  let q = `update Event set title = '${title}', description = '${description}', venue = '${venue}', event_date = '${event_date}', event_time = '${event_time}' where event_id = ${id};`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect(`/currentevents/${id}/details`);
    });
  } catch (error) {
    console.log(error);
  }
});

//route to previous events page
eventRouter.get("/previousevents/:id/details", (req, res) => {
  let q = `select * from Event,Feedback,Member where Event.event_id = ${req.params.id} and Feedback.event_id = Event.event_id and Feedback.member_id=Member.member_id;`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      console.log(events);
      res.render("home/event/previousEventDetails.ejs", { event: events[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = eventRouter;
