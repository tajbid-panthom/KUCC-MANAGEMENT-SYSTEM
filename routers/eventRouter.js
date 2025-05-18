const express = require("express");
const mysql = require("mysql2");
const shared = require("./sharedState");

const eventRouter = express.Router();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});

eventRouter.get("/currentevents", (req, res) => {
  let q = `select * from Event order by event_id desc;`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      global.shared.upevent_id = events[0].event_id;
      global.shared.event_id = events[1].event_id;
      global.shared.preEvent_id = events[2].event_id;
      res.render("home/event/eventOverview.ejs", {
        event: events[1],
        admin: shared.admin,
        prevEvents: events.slice(2, events.length),
        upEvent: events[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
});
eventRouter.get("/feedback/:id", (req, res) => {
  let id = req.params.id;
  let q = `select member_id,name from Member where member_id = ${global.shared.abs_member};`;
  try {
    connection.query(q, (err, member) =>
      res.render("home/event/feedback.ejs", {
        member: member[0],
        event_id: id,
      })
    );
  } catch (error) {
    console.log(error);
  }
});
eventRouter.post("/previousevents_feedback", (req, res) => {
  let { member_id, event_id, comment } = req.body;
  let q = `insert into Feedback (member_id,event_id,comment) values (${member_id},${event_id},'${comment}');`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect(`/previousevents/${event_id}/details`);
    });
  } catch (error) {
    console.log(error);
  }
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
eventRouter.get("/currentevents/:id/registration", (req, res) => {
  let id = req.params.id;
  let member_id = global.shared.abs_member;
  let q = `select * from Member where member_id = ${member_id};`;
  try {
    connection.query(q, (err, member) =>
      res.render("home/event/eventRegistration.ejs", {
        member: member[0],
        event_id: id,
      })
    );
  } catch (error) {
    console.log(error);
  }
});
eventRouter.post("/registration/:id/confirm", (req, res) => {
  let event_id = req.params.id;
  let member_id = global.shared.abs_member;
  let q = `insert into Participation(member_id,event_id,status) values (${member_id},${event_id},"Registered");`;

  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect(`/currentevents/${event_id}/details`);
    });
  } catch (error) {
    console.log(error);
  }
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
  let q2 = `select * from Participation where event_id = ${req.params.id} and member_id = ${global.shared.abs_member};`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      try {
        connection.query(q2, (err2, participation) => {
          if (err2) throw err2;
          global.shared.participated = participation[0]?.status;
          res.render("home/event/eventDetails.ejs", {
            event: events[0],
          });
        });
      } catch (error2) {
        console.log(error2);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
eventRouter.get("/upcomming/:id/details", (req, res) => {
  let q = `select * from Event where event_id = ${req.params.id};`;
  try {
    connection.query(q, (err, events) => {
      if (err) throw err;
      res.render("home/event/upcomingEventDetails.ejs", {
        event: events[0],
        admin: shared.admin,
        member_status: shared.member_status,
      });
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
  const eventId = req.params.id;

  const eventQuery = `
    SELECT * FROM Event
    WHERE event_id = ?
  `;

  const feedbackQuery = `
    SELECT M.name, F.comment
    FROM Member M
    JOIN Feedback F ON M.member_id = F.member_id
    WHERE F.event_id = ?
    order by F.feedback_id desc;
  `;

  connection.query(eventQuery, [eventId], (err, eventResults) => {
    if (err) {
      console.error("Error fetching event:", err);
      return res.status(500).send("Failed to load event details");
    }

    if (eventResults.length === 0) {
      return res.status(404).send("Event not found");
    }

    connection.query(feedbackQuery, [eventId], (err, feedbackResults) => {
      if (err) {
        console.error("Error fetching feedback:", err);
        return res.status(500).send("Failed to load feedback");
      }

      res.render("home/event/previousEventDetails.ejs", {
        event: eventResults[0],
        feedbacks: feedbackResults,
      });
    });
  });
});

module.exports = eventRouter;
