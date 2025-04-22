const express = require("express");

const eventRouter = express.Router();

eventRouter.get("/currentevents", (req, res) => {
  res.render("home/event/eventOverview.ejs");
});
eventRouter.get("/feedback", (req, res) => {
  res.render("home/event/feedback.ejs");
});
//route to certificate page
eventRouter.get("/certificate", (req, res) => {
  res.render("home/event/certificate.ejs");
});
eventRouter.get("/currentevents/registration", (req, res) => {
  res.render("home/event/eventRegistration.ejs");
});
eventRouter.get("/currentevents/new", (req, res) => {
  res.render("home/event/createEvent.ejs");
});
eventRouter.get("/currentevents/details", (req, res) => {
  res.render("home/event/eventDetails.ejs");
});
eventRouter.get("/currentevents/details/edit", (req, res) => {
  res.render("home/event/updateEvent.ejs");
});

//route to previous events page
eventRouter.get("/previousevents/details", (req, res) => {
  res.render("home/event/previousEventDetails.ejs");
});

module.exports = eventRouter;
