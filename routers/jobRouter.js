const express = require("express");
const jobRouter = express.Router();
const shared = require("./sharedState");
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
      Job_Internship.job_type,
      Company.company_name
    FROM Job_Internship
    JOIN Company ON Job_Internship.company = Company.company_id;
  `;
  let q2 = "SELECT COUNT(*) AS totalJobs FROM Job_Internship";

  try {
    connection.query(q, (err, jobs) => {
      if (err) throw err;

      connection.query(q2, (err2, countResult) => {
        if (err2) throw err2;
        let totalJobs = countResult[0].totalJobs;
        res.render("home/job/jobOverview.ejs", {
          jobs,
          totalJobs,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// route to details in job
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

      res.render("home/job/jobDetails.ejs", {
        job: jobs[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
});
//route to create job
jobRouter.get("/jobs/new", (req, res) => {
  let q = "SELECT company_name FROM Company";
  try {
    connection.query(q, (err, companies) => {
      if (err) throw err;
      res.render("home/job/createJob.ejs", { companies });
    });
  } catch (error) {
    console.log(error);
  }
});

//route to update job
jobRouter.get("/jobs/:id/edit", (req, res) => {
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
      res.render("home/job/updateJob.ejs", { job: jobs[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

//update job
jobRouter.put("/jobs/:id/details", (req, res) => {
  const id = req.params.id;
  let {
    role,
    job_type,
    company_name,
    job_description,
    salary,
    location,
    deadline,
  } = req.body;

  let q1 = `SELECT * FROM Job_Internship WHERE job_id = ${id};`;
  try {
    connection.query(q1, (err, _) => {
      if (err) throw err;
      let q2 = `
        UPDATE Job_Internship
      SET 
          role = '${role}',          job_description = '${job_description}',
          deadline = '${deadline}',
          salary = '${salary}',
          location = '${location}',
          job_type = '${job_type}'
      WHERE job_id = ${id};
  `;
      try {
        connection.query(q2, (err, _) => {
          if (err) throw err;
          res.redirect(`/jobs/${id}/details`);
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//create job
jobRouter.post("/jobs", (req, res) => {
  const {
    role,
    job_type,
    company,
    job_description,
    salary,
    location,
    deadline,
  } = req.body;
  let q1 = `SELECT company_id FROM Company WHERE company_name = '${company}';`;

  try {
    connection.query(q1, (err, result) => {
      if (err) throw err;
      let company_id = result[0].company_id;
      let q = `
    INSERT INTO Job_Internship (role, company, job_description,deadline, salary, location,job_type)
    VALUES ('${role}', '${company_id}', '${job_description}', '${deadline}', '${salary}', '${location}', '${job_type}');
  `;
      try {
        connection.query(q, (err, _) => {
          if (err) throw err;
          res.redirect("/jobs");
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

jobRouter.delete("/jobs/:id/delete", (req, res) => {
  const id = req.params.id;
  let q = `DELETE FROM Job_Internship WHERE job_id = ${id};`;
  try {
    connection.query(q, (err, _) => {
      if (err) throw err;
      res.redirect("/jobs");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = jobRouter;
