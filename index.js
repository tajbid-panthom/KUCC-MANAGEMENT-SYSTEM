const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { router } = require("./routers/router.js");
const mentorRouter = require("./routers/mentorRouter");
const seminarRouter = require("./routers/seminarRouter");
const companyRouter = require("./routers/companyRouter");
const jobRouter = require("./routers/jobRouter");
const eventRouter = require("./routers/eventRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static("public"));
app.engine("ejs", ejsMate);

app.use(router);
app.use(mentorRouter);
app.use(seminarRouter);
app.use(companyRouter);
app.use(jobRouter);
app.use(eventRouter);

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log("Server is running on port 8080");
});
