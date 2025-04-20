const express = require("express");
const jobRouter = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});
//all indexing
jobRouter.get("/jobs", (req, res) => {
  let q = `
    SELECT 
      Job_Internship.job_id, 
      Job_Internship.role, 
      Job_Internship.job_description, 
      Job_Internship.deadline, 
      Job_Internship.salary,
      Job_Internship.location,
      Company.company_name
    FROM Job_Internship
    JOIN Company ON Job_Internship.company = Company.company_id
  `;
  let q2 = "SELECT COUNT(*) AS totalJobs FROM Job_Internship";

  try {
    connection.query(q, (err, jobs) => {
      if (err) throw err;

      connection.query(q2, (err2, countResult) => {
        if (err2) throw err2;
        let totalJobs = countResult[0].totalJobs;
        res.render("home/job/jobOverview.ejs", { jobs, totalJobs });
      });
    });
  } catch (error) {
    console.log(error);
  }
});
//details in job
jobRouter.get("/jobs/:id/details", (req, res) => {
  let id = req.params.id;
  let q = `
  SELECT 
    Job_Internship.job_id, 
    Job_Internship.role, 
    Job_Internship.job_description, 
    Job_Internship.deadline, 
    Job_Internship.salary,
    Job_Internship.location,
    Job_Internship.job_type,
    Company.company_name
  FROM Job_Internship
  JOIN Company ON Job_Internship.company = Company.company_id
  WHERE Job_Internship.job_id = ${id};
`;

  try {
    connection.query(q, (err, jobs) => {
      if (err) throw err;

      res.render("home/job/jobDetails.ejs", { job: jobs[0] });
    });
  } catch (error) {
    console.log(error);
  }
});
jobRouter.get("/jobs/new", (req, res) => {
  res.render("home/job/createJob.ejs");
});
jobRouter.get("/jobs/id/edit", (req, res) => {
  res.render("home/job/updateJob.ejs");
});

module.exports = jobRouter;
