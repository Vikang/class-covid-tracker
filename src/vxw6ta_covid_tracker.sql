-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2020 at 10:06 PM
-- Server version: 8.0.20
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vxw6ta_covid_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appt_time` time(6) NOT NULL,
  `appt_date` date NOT NULL,
  `appt_location` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `physician` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `appointment_id` int NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appt_time`, `appt_date`, `appt_location`, `physician`, `appointment_id`, `details`) VALUES
('12:00:00.000000', '2020-10-25', 'UVA Student Health and Wellness', 'Jessica Simmons, MD', 53390, 'Fever, cough'),
('12:00:00.000000', '2020-10-26', 'UVA Student Health and Wellness', 'Jessica Simmons, MD', 53391, 'Lack of taste'),
('13:00:00.000000', '2020-10-26', 'UVA Student Health and Wellness', 'Stephanie Hartman, MD', 53392, 'Fever'),
('12:00:00.000000', '2020-10-25', 'UVA Student Health and Wellness', 'Mark S. Keeley, MD', 53393, 'Fever'),
('13:00:00.000000', '2020-10-26', 'UVA Student Health and Wellness', 'Jessica Simmons, MD', 53394, 'Fever');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `region` varchar(20) NOT NULL,
  `reported_sicknesses` int NOT NULL,
  `case_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`region`, `reported_sicknesses`, `case_date`) VALUES
('Charlottesville, VA', 1, '2020-10-23'),
('Charlottesville, VA', 1, '2020-10-24'),
('Charlottesville, VA', 2, '2020-10-25'),
('Fairfax, VA', 1, '2020-10-25'),
('New York, New York', 2, '2020-10-24'),
('New York, New York', 2, '2020-10-25');

-- --------------------------------------------------------

--
-- Table structure for table `has`
--

CREATE TABLE `has` (
  `appointment_id` int NOT NULL,
  `numeric_rating` int NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `has`
--

INSERT INTO `has` (`appointment_id`, `numeric_rating`, `description`) VALUES
(53391, 5, 'Helpful!'),
(53393, 3, 'Long wait time.'),
(53394, 5, 'Dr. Simmons was extremely kind and informative! No complaints about my appointment.');

-- --------------------------------------------------------

--
-- Table structure for table `health_status`
--

CREATE TABLE `health_status` (
  `computing_id` varchar(7) NOT NULL,
  `number` int NOT NULL,
  `status` varchar(10) NOT NULL,
  `severity` int NOT NULL,
  `symptoms` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `health_status`
--

INSERT INTO `health_status` (`computing_id`, `number`, `status`, `severity`, `symptoms`) VALUES
('ab22a', 1, 'positive', 5, 'Fever, chills, lack of taste, short of breath'),
('bc1ab', 1, 'positive', 3, 'Short of breath'),
('cd9aba', 1, 'positive', 2, 'Fever'),
('ddn3aq', 1, 'negative', 0, 'N/A'),
('de1qa', 1, 'negative', 0, 'N/A'),
('ea8sua', 1, 'negative', 0, 'N/A'),
('ef01ab', 1, 'negative', 0, 'N/A'),
('fg1jja', 1, 'positive', 2, 'Short of breath'),
('hc7ax', 1, 'negative', 0, 'N/A'),
('ks1ab', 1, 'positive', 3, 'Fever, Short of breath'),
('nbl3cj', 1, 'negative', 0, 'N/A'),
('oq1bb', 1, 'negative', 0, 'N/A'),
('pq98ba', 1, 'negative', 0, 'N/A'),
('qu81qo', 1, 'negative', 0, 'N/A'),
('sml6dk', 1, 'negative', 0, 'N/A'),
('ux9aa', 1, 'positive', 2, 'Fever, Lack of taste'),
('ux9aa', 2, 'recovered', 0, 'N/A'),
('vxw6ta', 1, 'negative', 0, 'N/A'),
('yq29a', 1, 'negative', 0, 'N/A'),
('yw8ax', 1, 'negative', 0, 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `hospital_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(100) NOT NULL,
  `hospital_email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`hospital_name`, `address`, `hospital_email`) VALUES
('UVA Children\'s Hospital', '1204 W Main St, Charlottesville, VA 22903', 'uvahealth.com'),
('UVA Student Health and Wellness', '400 Brandon Ave, Charlottesville, VA 22903', 'studenthealth@virginia.edu'),
('UVA University Hospital', '1215 Lee St. Charlottesville, VA 22903', 'uvahealth.com');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_availability`
--

CREATE TABLE `hospital_availability` (
  `hospital_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `available_time` varchar(255) NOT NULL,
  `physician_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospital_availability`
--

INSERT INTO `hospital_availability` (`hospital_name`, `available_time`, `physician_name`) VALUES
('UVA Children\'s Hospital', 'Monday 7AM-5PM, Tuesday 7AM-8PM, Wednesday 7AM-5PM, Thursday 7AM-8PM', 'Rebecca A Abernathy MD, Cecelia C. Babbott MD, Shakun Gupta MD'),
('UVA Student Health and Wellness', 'Monday 8AM-5PM, Tuesday 8AM-5PM, Wednesday 8AM-5PM, Thursday 8AM-5PM, Friday 8AM-5PM', 'Jessica Simmons MD, Stephanie Hartman MD, Mark S. Keeley MD'),
('UVA University Hospital', 'Monday 12AM-11:59PM, Tuesday 12AM-11:59PM, Wednesday 12AM-11:59PM, Thursday 12AM-11:59PM, Friday 12AM-11:59PM, Saturday 12AM-11:59PM, Sunday 12AM-11:59PM', 'Rebecca A Abernathy MD, Deborah M Adams PA, Claudia W Allen PhD');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_physician`
--

CREATE TABLE `hospital_physician` (
  `hospital_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `physician_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospital_physician`
--

INSERT INTO `hospital_physician` (`hospital_name`, `physician_name`) VALUES
('UVA Children\'s Hospital', 'Cecelia C. Babbott MD'),
('UVA Children\'s Hospital', 'Rebecca A Abernathy MD'),
('UVA Children\'s Hospital', 'Shakun Gupta MD'),
('UVA Student Health and Wellness', 'Jessica Simmons MD'),
('UVA Student Health and Wellness', 'Mark S. Keeley MD'),
('UVA Student Health and Wellness', 'Stephanie Hartman MD'),
('UVA University Hospital', 'Claudia W Allen PhD'),
('UVA University Hospital', 'Deborah M Adams PA'),
('UVA University Hospital', 'Rebecca A Abernathy MD');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `computing_id` varchar(7) NOT NULL,
  `number` int NOT NULL,
  `student_location` varchar(50) NOT NULL,
  `log_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`computing_id`, `number`, `student_location`, `log_date`) VALUES
('ab22a', 1, 'Charlottesville, VA', '2020-10-24 17:42:28.000000'),
('bc1ab', 1, 'Fairfax, VA', '2020-10-25 17:42:28.000000'),
('cd9aba', 1, 'Charlottesville, VA', '2020-10-25 17:42:28.000000'),
('ddn3aq', 1, 'Richmond, VA', '2020-10-23 17:42:28.000000'),
('de1qa', 1, 'Charlottesville, VA', '2020-10-25 17:42:28.000000'),
('ea8sua', 1, 'Los Angeles, CA', '2020-10-24 17:42:28.000000'),
('ef01ab', 1, 'Charlottesville, VA', '2020-10-22 17:42:28.000000'),
('fg1jja', 1, 'New York, New York', '2020-10-24 17:42:28.000000'),
('gy1hq', 1, 'Charlottesville, VA', '2020-10-24 17:42:28.000000'),
('hc7ax', 1, 'Charlottesville, VA', '2020-10-25 17:42:28.000000'),
('ks1ab', 1, 'New York, New York', '2020-10-25 17:42:28.000000'),
('nbl3cj', 1, 'Charlottesville, VA', '2020-10-23 17:42:28.000000'),
('oq1bb', 1, 'Charlottesville, VA', '2020-10-22 17:42:28.000000'),
('pq98ba', 1, 'Charlottesville, VA', '2020-10-24 17:42:28.000000'),
('qu81qo', 1, 'Atlanta, GA', '2020-10-24 17:42:28.000000'),
('sml6dk', 1, 'Charlottesville, VA', '2020-10-21 17:42:28.000000'),
('ux9aa', 1, 'Charlottesville, VA', '2020-10-23 17:42:28.000000'),
('ux9aa', 2, 'Charlottesville, VA', '2020-10-24 17:42:28.000000'),
('vxw6ta', 1, 'Centreville, VA', '2020-10-21 17:42:28.000000'),
('yq29a', 1, 'Charlottesville, VA', '2020-10-23 17:42:28.000000'),
('yw8ax', 1, 'Charlottesville, VA', '2020-10-23 17:42:28.000000');

-- --------------------------------------------------------

--
-- Table structure for table `provides`
--

CREATE TABLE `provides` (
  `appointment_id` int NOT NULL,
  `hospital_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `provides`
--

INSERT INTO `provides` (`appointment_id`, `hospital_name`) VALUES
(53390, 'UVA Student Health and Wellness'),
(53391, 'UVA Student Health and Wellness'),
(53392, 'UVA Student Health and Wellness'),
(53393, 'UVA Student Health and Wellness'),
(53394, 'UVA Student Health and Wellness');

-- --------------------------------------------------------

--
-- Table structure for table `rates`
--

CREATE TABLE `rates` (
  `computing_id` varchar(7) NOT NULL,
  `numeric_rating` int NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rates`
--

INSERT INTO `rates` (`computing_id`, `numeric_rating`, `description`) VALUES
('ab22a', 5, '	\r\nHelpful!'),
('cd9aba', 3, 'Long wait time.'),
('ux9aa', 5, 'Dr. Simmons was extremely kind and informative! No complaints about my appointment.');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `appointment_id` int NOT NULL,
  `numeric_rating` int NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`appointment_id`, `numeric_rating`, `description`) VALUES
(53391, 5, 'Helpful!'),
(53393, 3, 'Long wait time.'),
(53394, 5, 'Dr. Simmons was extremely kind and informative! No complaints about my appointment.');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `appointment_id` varchar(5) NOT NULL,
  `computing_id` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`appointment_id`, `computing_id`) VALUES
('53390', 'ux9aa'),
('53391', 'ab22a'),
('53392', 'bc1ab'),
('53393', 'cd9aba'),
('53394', 'ux9aa');

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `region` varchar(20) NOT NULL,
  `case_date` date NOT NULL,
  `reported_sicknesses` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`region`, `case_date`, `reported_sicknesses`) VALUES
('Charlottesville, VA', '2020-10-23', 1),
('Charlottesville, VA', '2020-10-24', 1),
('Charlottesville, VA', '2020-10-25', 2),
('Fairfax, VA', '2020-10-25', 1),
('New York, New York', '2020-10-24', 2),
('New York, New York', '2020-10-25', 2);

-- --------------------------------------------------------

--
-- Table structure for table `uva_student`
--

CREATE TABLE `uva_student` (
  `computing_id` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uva_student_email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `uva_student`
--

INSERT INTO `uva_student` (`computing_id`, `password`, `first_name`, `last_name`, `uva_student_email`) VALUES
('ab22a', 'ua10s9', 'Abby', 'Bao', 'ab22a@virginia.edu'),
('bc1ab', 'ioib12', 'Billy', 'Cooper', 'bc1ab@virginia.edu'),
('cd9aba', 'aosdio21', 'Christina', 'Dillon', 'cd9aba@virginia.edu'),
('ddn3aq', 'waHoowA92', 'Dustin', 'Nguyen', 'ddn3aq@virginia.edu'),
('de1qa', '12oijasd1', 'Dixie', 'Exie', 'de1qa@virginia.edu'),
('ea8sua', 'tyty381', 'Eric', 'Ae', 'ea8sua@virginia.edu'),
('ef01ab', 'odoi309', 'Eric', 'Fuego', 'ef01ab@virginia.edu'),
('fg1jja', 'oiasdio1', 'Fred', 'Gogo', 'fg1jja@virginia.edu'),
('gy1hq', 'oopiopi1', 'Goodie', 'Yae', 'gy1hq@virginia.edu'),
('hc7ax', 'abc123', 'Hewitt', 'Colombus', 'hc7ax@virginia.edu'),
('ks1ab', 'oasio1', 'Kris', 'Soy', 'ks1ab@virginia.edu'),
('nbl3cj', 'topball967', 'Nathan', 'Lee', 'nbl3cj@virginia.edu'),
('oq1bb', 'qppoi2', 'Owen', 'Qq', 'oq1bb@virginia.edu'),
('pq98ba', 'aoiv1', 'Pamela', 'Qae', 'pq98ba@virginia.edu'),
('qu81qo', 'qwerty112', 'Quang', 'Ubu', 'qu81qo@virginia.edu'),
('sml6dk', 'r0ckstar527', 'Simon', 'Li', 'sml6dk@virginia.edu'),
('ux9aa', 'abcdef7728', 'Umit', 'Xie', 'ux9aa@virginia.edu'),
('vxw6ta', 'genShinC00l22', 'Victoria', 'Wang', 'vxw6ta@virginia.edu'),
('yq29a', 'bjjxciivj3', 'Yax', 'Quang', 'yq29a@virginia.edu'),
('yw8ax', 'ioasjdi18', 'Yazmine', 'Wang', 'yw8ax@virginia.edu');

-- --------------------------------------------------------

--
-- Table structure for table `uva_student_phone`
--

CREATE TABLE `uva_student_phone` (
  `computing_id` varchar(7) NOT NULL,
  `phone_number` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `uva_student_phone`
--

INSERT INTO `uva_student_phone` (`computing_id`, `phone_number`) VALUES
('ab22a', '484-496-7583'),
('bc1ab', '479-229-1044'),
('cd9aba', '512-625-4644'),
('ddn3aq', '617-468-2930'),
('de1qa', '601-259-0785'),
('ea8sua', '734-387-8045'),
('ef01ab', '573-315-1442'),
('fg1jja', '562-279-0622'),
('gy1hq', '320-367-8117'),
('hc7ax', '585-484-2169'),
('ks1ab', '480-294-7050'),
('nbl3cj', '609-891-2626'),
('oq1bb', '712-522-5490'),
('pq98ba', '850-681-8078'),
('qu81qo', '850-558-5288'),
('sml6dk', '530-528-6271'),
('ux9aa', '352-771-7249'),
('vxw6ta', '580-770-3963'),
('yq29a', '440-805-9388'),
('yw8ax', '843-578-4564');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`region`,`reported_sicknesses`,`case_date`);

--
-- Indexes for table `has`
--
ALTER TABLE `has`
  ADD PRIMARY KEY (`appointment_id`,`numeric_rating`,`description`);

--
-- Indexes for table `health_status`
--
ALTER TABLE `health_status`
  ADD PRIMARY KEY (`computing_id`,`number`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`hospital_name`);

--
-- Indexes for table `hospital_availability`
--
ALTER TABLE `hospital_availability`
  ADD PRIMARY KEY (`hospital_name`);

--
-- Indexes for table `hospital_physician`
--
ALTER TABLE `hospital_physician`
  ADD PRIMARY KEY (`hospital_name`,`physician_name`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`computing_id`,`number`);

--
-- Indexes for table `provides`
--
ALTER TABLE `provides`
  ADD PRIMARY KEY (`hospital_name`,`appointment_id`);

--
-- Indexes for table `rates`
--
ALTER TABLE `rates`
  ADD PRIMARY KEY (`computing_id`,`numeric_rating`,`description`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`appointment_id`,`numeric_rating`,`description`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`appointment_id`,`computing_id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`region`,`case_date`);

--
-- Indexes for table `uva_student`
--
ALTER TABLE `uva_student`
  ADD PRIMARY KEY (`computing_id`);

--
-- Indexes for table `uva_student_phone`
--
ALTER TABLE `uva_student_phone`
  ADD PRIMARY KEY (`computing_id`,`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53395;

--
-- AUTO_INCREMENT for table `has`
--
ALTER TABLE `has`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53395;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
