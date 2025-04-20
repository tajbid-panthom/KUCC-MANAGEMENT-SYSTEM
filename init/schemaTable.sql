CREATE TABLE Member (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    student_id VARCHAR(50),
    dept_name VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    hometown VARCHAR(100),
    skill TEXT,
    expectation TEXT,
    why_hire TEXT,
    role VARCHAR(50) DEFAULT 'member',
    status ENUM('active', 'pending') DEFAULT 'pending',
    password VARCHAR(255),
    confirm_password VARCHAR(255),
    join_date DATE
) ENGINE=InnoDB;

CREATE TABLE Event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    description TEXT,
    venue VARCHAR(100),
    event_date DATE,
    event_time TIME
) ENGINE=InnoDB;

CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    event_id INT,
    comment TEXT,
    FOREIGN KEY (member_id) REFERENCES Member(member_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
) ENGINE=InnoDB;

CREATE TABLE Payment (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    payment_status VARCHAR(50),
    transaction_id VARCHAR(50),
    payment_method VARCHAR(50),
    FOREIGN KEY (member_id) REFERENCES Member(member_id)
) ENGINE=InnoDB;

CREATE TABLE Certificate (
    certification_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    issue_date DATE,
    certification_link TEXT,
    status VARCHAR(50),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
) ENGINE=InnoDB;

CREATE TABLE Seminar (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    time TIME,
    session_type VARCHAR(50),
    description TEXT,
    counseling_link TEXT
) ENGINE=InnoDB;

CREATE TABLE Mentor (
    mentor_id INT PRIMARY KEY AUTO_INCREMENT,
    mentor_name VARCHAR(100),
    qualification VARCHAR(100),
    email VARCHAR(100),
    description TEXT
) ENGINE=InnoDB;

CREATE TABLE Company (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100),
    address VARCHAR(255),
    company_type VARCHAR(50),
    company_detail TEXT
) ENGINE=InnoDB;

CREATE TABLE `Job_Internship` (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(100),
    company INT,
    job_description TEXT,
    deadline DATE,
    salary DECIMAL(10,2),
    location VARCHAR(100),
    job_type VARCHAR(50),
    FOREIGN KEY (company) REFERENCES Company(company_id)
) ENGINE=InnoDB;

CREATE TABLE Participation (
    participation_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    event_id INT,
    status VARCHAR(50),
    FOREIGN KEY (member_id) REFERENCES Member(member_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
) ENGINE=InnoDB;

CREATE TABLE Application (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    job_id INT,
    status ENUM('applied', 'pending') DEFAULT 'pending',
    FOREIGN KEY (member_id) REFERENCES Member(member_id),
    FOREIGN KEY (job_id) REFERENCES Job_Internship(job_id)
) ENGINE=InnoDB;

CREATE TABLE Perform (
    perform_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    session_id INT,
    FOREIGN KEY (member_id) REFERENCES Member(member_id),
    FOREIGN KEY (session_id) REFERENCES Seminar(session_id)
) ENGINE=InnoDB;

CREATE TABLE Conduction (
    conduction_id INT PRIMARY KEY AUTO_INCREMENT,
    mentor_id INT,
    session_id INT,
    FOREIGN KEY (mentor_id) REFERENCES Mentor(mentor_id),
    FOREIGN KEY (session_id) REFERENCES Seminar(session_id)
) ENGINE=InnoDB;
