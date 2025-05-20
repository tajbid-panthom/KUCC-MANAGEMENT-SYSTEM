# KUCC Management System

A Node.js and Express-based web application designed to manage and streamline operations for the KUCC (presumably a university computing club). It supports management of events, seminars, mentors, jobs/internships, companies, and more.

## 🚀 Features

- CRUD operations for:
  - Events
  - Seminars
  - Mentors
  - Jobs and Internships
  - Companies
  - Users
- Organized API routes using Express routers
- Modular SQL schema and dummy data setup
- Integration-ready for frontend views

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MySQL** – Relational database (via SQL scripts)
- **EJS / Views** – Frontend rendering (assumed from `views/` folder)
- **SQL** – Used for schema and dummy data
- **npm** – Dependency management

## 📁 Project Structure

```
KUCC-MANAGEMENT-SYSTEM/
├── index.js                 # Main entry point
├── init/                    # SQL schema and dummy data
│   ├── schemaTable.sql
│   ├── dummy_data.sql
|   └── db.txt               # Command to run sql in terminal
├── routers/                 # All Express routes
│   ├── eventRouter.js
│   ├── seminarRouter.js
│   ├── mentorRouter.js
│   ├── jobRouter.js
│   ├── companyRouter.js
|   ├── sharedState.js       # Global file for shared access of admin and member 
│   └── router.js
├── views/                   # Frontend View
|   ├── home/
|   |   ├── company/
|   |   |   ├── companyOverview.ejs                
|   |   |   ├── companyDetails.ejs                
|   |   |   ├── createCompany.ejs                
|   |   |   └── updateCompany.ejs                
|   |   ├── event/
|   |   |   ├── certificate.ejs                
|   |   |   ├── createEvent.ejs                
|   |   |   ├── eventDetails.ejs                
|   |   |   ├── eventOverview.ejs                
|   |   |   ├── eventRegistraiton.ejs                
|   |   |   ├── feedback.ejs                
|   |   |   ├── previousEventDetails.ejs                
|   |   |   ├── upcomingEventDetails.ejs                
|   |   |   └── updateEvent.ejs                
|   |   ├── job/
|   |   |   ├── createJob.ejs                
|   |   |   ├── jobDetails.ejs                
|   |   |   ├── jobOverview.ejs                
|   |   |   └── updateJob.ejs                 
|   |   ├── mentor/
|   |   |   ├── createMentor.ejs                
|   |   |   ├── mentorDetails.ejs                
|   |   |   ├── mentorOverview.ejs                
|   |   |   └── updateMentor.ejs                 
|   |   ├── seminar/
|   |   |   ├── createSeminar.ejs                     
|   |   |   ├── seminarOverview.ejs                
|   |   |   └── updateSeminar.ejs                 
|   |   ├── user/
|   |   |   ├── admin.ejs                     
|   |   |   ├── editprofile.ejs                
|   |   |   ├── index.ejs(main)                     
|   |   |   ├── login.ejs  
|   |   |   ├── profile.ejs  
|   |   └─  └── signup.ejs
|   ├── includes/
|   |   ├── basicCompanies.ejs
|   |   ├── basicEvent.ejs
|   |   ├── basicJob.ejs
|   |   ├── basicSeminar.ejs
|   |   ├── footer.ejs
|   |   └── navbar.ejs
|   ├── layouts/
|   └── └── boilerplate.ejs
├── public/
|   ├── css/   
|   |   └── styles.ejs              # Static assets (CSS, JS)
|   ├── images/   
|   |   └── images              # Static assets (CSS, JS)
|   ├── js/   
|   └── └── script.js              # Static assets (CSS, JS)
├── .gitignore
├── package.json             # Dependencies and metadata
```

## ⚙️ Installation

### Prerequisites

- Node.js (v14+ recommended)
- MySQL Server

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/KUCC-MANAGEMENT-SYSTEM.git
   cd KUCC-MANAGEMENT-SYSTEM
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup the database:**

   - Import `init/schemaTable.sql` to create tables.
   - Optionally import `init/dummy_data.sql` to populate sample data.
   - Change the connection password from all routes which lies in `router` folder as your MySQL server password.

4. **Run the application:**

   ```bash
   npm run dev
   ```

   App will typically run at `http://localhost:8080/`.

## 👥 Contributors

- [Name: Md Tajbid Hossain Bappi, Student ID: 230235 ](https://github.com/tajbid-panthom) – Developer
- [Name: Sajal Mondal, Student ID: 230205 ](https://github.com/Sajal-97) – Developer
- [Name: Md Abdullah Al Mahin, Student ID: 230210 ](https://github.com/Mahin9355) – Developer

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For questions, feedback, or contributions, please contact: tajbidhossain903@gmail.com