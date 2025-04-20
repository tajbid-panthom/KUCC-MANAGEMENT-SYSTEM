-- Member
INSERT INTO Member (name, student_id, dept_name, phone_number, email, hometown, skill, expectation, why_hire, password, confirm_password, join_date)
VALUES
('Alice Rahman', 'CSE2023001', 'CSE', '01711112222', 'alice@club.com', 'Dhaka', 'HTML, CSS', 'Networking', 'Creative and reliable', 'pass123', 'pass123', '2024-01-10'),
('Bob Hossain', 'CSE2023002', 'CSE', '01722223333', 'bob@club.com', 'Chittagong', 'Java, Spring', 'Skill building', 'Team player', 'pass123', 'pass123', '2024-01-11'),
('Charlie Ahmed', 'CSE2023003', 'CSE', '01733334444', 'charlie@club.com', 'Khulna', 'Python, AI', 'Research', 'Tech-savvy', 'pass123', 'pass123', '2024-01-12'),
('Diana Karim', 'CSE2023004', 'CSE', '01744445555', 'diana@club.com', 'Rajshahi', 'React, JS', 'Development', 'Fast learner', 'pass123', 'pass123', '2024-01-13'),
('Evan Noor', 'CSE2023005', 'CSE', '01755556666', 'evan@club.com', 'Sylhet', 'ML, DS', 'Projects', 'Dedicated', 'pass123', 'pass123', '2024-01-14'),
('Faria Islam', 'CSE2023006', 'CSE', '01766667777', 'faria@club.com', 'Barisal', 'UI/UX', 'Design exposure', 'Creative thinker', 'pass123', 'pass123', '2024-01-15'),
('George Rafi', 'CSE2023007', 'CSE', '01777778888', 'george@club.com', 'Comilla', 'Node.js', 'Backend mastery', 'Quick adopter', 'pass123', 'pass123', '2024-01-16'),
('Hira Zaman', 'CSE2023008', 'CSE', '01788889999', 'hira@club.com', 'Rangpur', 'Cybersecurity', 'Security knowledge', 'Proactive', 'pass123', 'pass123', '2024-01-17');

-- Event
INSERT INTO Event (title, description, venue, event_date, event_time)
VALUES
('Tech Talk', 'AI and ML discussion', 'Auditorium A', '2024-02-10', '10:00:00'),
('Code Fiesta', 'Coding competition', 'Lab 101', '2024-03-15', '14:00:00'),
('Design Sprint', 'UI/UX workshop', 'Lab 203', '2024-04-01', '11:00:00'),
('Hackathon', '48hr Hackathon challenge', 'Hall B', '2024-05-05', '09:00:00'),
('Career Fair', 'Company stalls and hiring', 'Auditorium B', '2024-06-20', '10:30:00'),
('Startup Showcase', 'Startup pitches', 'Room 501', '2024-07-15', '13:00:00'),
('Cloud Bootcamp', 'AWS and GCP basics', 'Online', '2024-08-22', '17:00:00'),
('Data Day', 'Data Science seminar', 'Conference Room', '2024-09-10', '15:00:00');

-- Feedback
INSERT INTO Feedback (member_id, event_id, comment)
VALUES
(1, 1, 'Great session!'),
(2, 2, 'Loved the challenges'),
(3, 3, 'Very informative'),
(4, 4, 'Fun and intense'),
(5, 5, 'Helpful networking'),
(6, 6, 'Inspirational startups'),
(7, 7, 'Loved the content'),
(8, 8, 'Great insights on data');

-- Payment
INSERT INTO Payment (member_id, amount, payment_date, payment_status, transaction_id, payment_method)
VALUES
(1, 500.00, '2024-02-01', 'Paid', 'TXN1001', 'Bkash'),
(2, 450.00, '2024-02-05', 'Paid', 'TXN1002', 'Nagad'),
(3, 300.00, '2024-03-10', 'Pending', 'TXN1003', 'Cash'),
(4, 400.00, '2024-03-12', 'Paid', 'TXN1004', 'Card'),
(5, 350.00, '2024-04-01', 'Paid', 'TXN1005', 'Bkash'),
(6, 250.00, '2024-04-15', 'Paid', 'TXN1006', 'Rocket'),
(7, 600.00, '2024-05-05', 'Pending', 'TXN1007', 'Cash'),
(8, 550.00, '2024-05-10', 'Paid', 'TXN1008', 'Bkash');

-- Certificate
INSERT INTO Certificate (event_id, issue_date, certification_link, status)
VALUES
(1, '2024-02-15', 'link1.com', 'Issued'),
(2, '2024-03-20', 'link2.com', 'Issued'),
(3, '2024-04-05', 'link3.com', 'Processing'),
(4, '2024-05-10', 'link4.com', 'Issued'),
(5, '2024-06-25', 'link5.com', 'Issued'),
(6, '2024-07-20', 'link6.com', 'Processing'),
(7, '2024-08-25', 'link7.com', 'Issued'),
(8, '2024-09-15', 'link8.com', 'Issued');

-- Seminar
INSERT INTO Seminar (date, time, session_type, description, counseling_link)
VALUES
('2024-02-18', '10:00:00', 'Career', 'CV making workshop', 'link.com/1'),
('2024-03-01', '11:00:00', 'Tech', 'Git & GitHub', 'link.com/2'),
('2024-04-02', '15:00:00', 'Career', 'LinkedIn tips', 'link.com/3'),
('2024-05-03', '09:30:00', 'Health', 'Stress Management', 'link.com/4'),
('2024-06-10', '13:00:00', 'Career', 'Interview Tips', 'link.com/5'),
('2024-07-05', '10:00:00', 'Tech', 'Firebase basics', 'link.com/6'),
('2024-08-01', '14:00:00', 'Career', 'Public Speaking', 'link.com/7'),
('2024-09-12', '12:00:00', 'Tech', 'Docker 101', 'link.com/8');

-- Mentor
INSERT INTO Mentor (mentor_name, qualification, email, description)
VALUES
('Dr. Imran', 'PhD in CS', 'imran@uni.edu', 'AI Specialist'),
('Ms. Sara', 'MSc in SE', 'sara@uni.edu', 'Frontend Developer'),
('Mr. Tanim', 'BSc in CSE', 'tanim@uni.edu', 'Backend Expert'),
('Dr. Niloy', 'PhD in DS', 'niloy@uni.edu', 'Data Scientist'),
('Ms. Nila', 'MBA', 'nila@uni.edu', 'Career Coach'),
('Mr. Reza', 'MSc in CyberSec', 'reza@uni.edu', 'Security Analyst'),
('Ms. Joya', 'MSc in AI', 'joya@uni.edu', 'ML Engineer'),
('Mr. Farid', 'MSc in Cloud', 'farid@uni.edu', 'DevOps Mentor');

-- Company
INSERT INTO Company (company_name, address, company_type, company_detail)
VALUES
('TechNova', 'Dhaka', 'Software', 'Web and mobile solutions'),
('DataWhiz', 'Chittagong', 'Analytics', 'Big Data services'),
('SecureNet', 'Sylhet', 'Cybersecurity', 'Security auditing'),
('SoftLab', 'Rajshahi', 'IT', 'Software outsourcing'),
('InnoCloud', 'Khulna', 'Cloud', 'Cloud architecture'),
('CodeVerse', 'Barisal', 'Startup', 'Innovative platforms'),
('ByteCraft', 'Comilla', 'Agency', 'Custom development'),
('AIWorks', 'Rangpur', 'AI', 'AI-powered tools');

-- Job_Internship
INSERT INTO Job_Internship (role, company, job_description, deadline, salary, location, job_type)
VALUES
('Frontend Dev Intern', 1, 'React-based UI building', '2024-05-10', 12000.00, 'Dhaka', 'Internship'),
('Data Analyst', 2, 'Data visualization', '2024-06-01', 25000.00, 'Chittagong', 'Job'),
('Security Associate', 3, 'Pen testing', '2024-05-15', 20000.00, 'Sylhet', 'Internship'),
('Backend Engineer', 4, 'Node.js APIs', '2024-06-05', 30000.00, 'Rajshahi', 'Job'),
('Cloud Intern', 5, 'Deploy on AWS', '2024-05-20', 15000.00, 'Khulna', 'Internship'),
('Marketing Exec', 6, 'Brand promotion', '2024-05-25', 18000.00, 'Barisal', 'Job'),
('UI/UX Intern', 7, 'Design mobile UI', '2024-06-15', 12000.00, 'Comilla', 'Internship'),
('AI Assistant', 8, 'Model training', '2024-06-30', 28000.00, 'Rangpur', 'Job');

-- Participation
INSERT INTO Participation (member_id, event_id, status)
VALUES
(1, 1, 'Attended'),
(2, 2, 'Registered'),
(3, 3, 'Attended'),
(4, 4, 'Missed'),
(5, 5, 'Attended'),
(6, 6, 'Registered'),
(7, 7, 'Attended'),
(8, 8, 'Registered');

-- Application
INSERT INTO Application (member_id, job_id, status)
VALUES
(1, 1, 'applied'),
(2, 2, 'pending'),
(3, 3, 'applied'),
(4, 4, 'pending'),
(5, 5, 'applied'),
(6, 6, 'pending'),
(7, 7, 'applied'),
(8, 8, 'pending');

-- Perform
INSERT INTO Perform (member_id, session_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);

-- Conduction
INSERT INTO Conduction (mentor_id, session_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);
