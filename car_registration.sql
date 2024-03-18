-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2024 at 04:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `Owner`
--

CREATE TABLE `Owner` (
  `owner_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Owner`
--

INSERT INTO `Owner` (`owner_id`, `first_name`, `last_name`, `address`, `phone_number`, `email`) VALUES
(1, 'george', 'rugambwa', 'Njiro', '076433333', 'george@gmail.com'),
(2, NULL, NULL, NULL, NULL, NULL),
(3, 'arnold', 'Deus', 'Dar-es-salaam', '076533333', 'arnold@gmail.com'),
(4, 'Angel', 'Mushi', 'Arushsa', '0745336736', 'angel@gmail.com'),
(5, 'David', 'mange', 'Mwanza', '0753657479', 'mangedavid@gmail.com'),
(6, 'Denis', 'kangemi', 'Kigoma', '0763020781', 'kangemidavid@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Vehicle`
--

CREATE TABLE `Vehicle` (
  `vehicle_id` int(11) NOT NULL,
  `make` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `registration_number` varchar(15) DEFAULT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicle`
--

INSERT INTO `Vehicle` (`vehicle_id`, `make`, `model`, `year`, `color`, `registration_number`, `owner_id`) VALUES
(1, 'Toyota', 'Corolla', 2022, 'Blue', 'TNNY997', 1),
(2, 'Toyota', 'Corolla', 2022, 'Blue', 'TBOI384', 2),
(3, 'Toyota', 'Corolla', 2022, 'Blue', 'TABC101', 1),
(9, 'Toyota', 'RAV4', 2022, 'purple', 'TBAA001', 3),
(10, 'Toyota', 'Corolla', 2011, 'black', 'TCAB003', 1),
(11, 'Audi', 'Q5', 2019, 'black', 'TBAB002', 1),
(12, 'BMW', 'SUV X5', 2020, 'White', 'TCAC004', 4),
(15, 'Hyundai', 'Tuscon', 2017, 'gray', 'TDAC005', 6),
(16, 'Toyota', 'Harrier', 2020, 'Black', 'TDAD006', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Owner`
--
ALTER TABLE `Owner`
  ADD PRIMARY KEY (`owner_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Vehicle`
--
ALTER TABLE `Vehicle`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD UNIQUE KEY `registration_number` (`registration_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Owner`
--
ALTER TABLE `Owner`
  MODIFY `owner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Vehicle`
--
ALTER TABLE `Vehicle`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
