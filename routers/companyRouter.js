const express = require("express");

const companyRouter = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tajbid01",
  database: "KUCC",
});

companyRouter.get("/companies", (req, res) => {
  let q = "SELECT * FROM Company ORDER BY company_id DESC;";
  try {
    connection.query(q, (err, companies) => {
      if (err) throw err;
      res.render("home/company/companiesOverview.ejs", { companies });
    });
  } catch (error) {
    console.log(error);
  }
});
companyRouter.post("/companies", (req, res) => {
  let { company_name, company_type, company_detail, address } = req.body;
  let q = `INSERT INTO Company (company_name, company_type, company_detail, address) VALUES ('${company_name}', '${company_type}', '${company_detail}', '${address}');`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/companies");
    });
  } catch (error) {
    console.log(error);
  }
});

companyRouter.get("/companies/:id/details", (req, res) => {
  let id = req.params.id;
  let q = `select * from Company where company_id = ${id};`;
  try {
    connection.query(q, (err, company) => {
      if (err) throw err;
      res.render("home/company/companyDetails.ejs", { company: company[0] });
    });
  } catch (error) {
    console.log(error);
  }
});
companyRouter.get("/companies/new", (req, res) => {
  res.render("home/company/createCompany.ejs");
});
companyRouter.get("/companies/:id/edit", (req, res) => {
  let id = req.params.id;
  let q = `select * from Company where company_id = ${id};`;
  try {
    connection.query(q, (err, company) => {
      if (err) throw err;
      res.render("home/company/updateCompany.ejs", { company: company[0] });
    });
  } catch (error) {
    console.log(error);
  }
});

companyRouter.put("/companies/:id/details", (req, res) => {
  let id = req.params.id;
  let { company_name, company_type, company_detail, address } = req.body;
  let q = `update Company set company_name= '${company_name}', address = '${address}', company_type = '${company_type}', company_detail='${company_detail}' where company_id = '${id}';`;
  try {
    connection.query(q, (err, company) => {
      if (err) throw err;
      res.redirect(`/companies/${id}/details`);
    });
  } catch (error) {
    console.log(error);
  }
});

companyRouter.delete("/companies/:id/delete", (req, res) => {
  let id = req.params.id;
  let q = `delete from Company where company_id = ${id};`;
  try {
    connection.query(q, (err, company) => {
      if (err) throw err;
      res.redirect("/companies");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = companyRouter;
