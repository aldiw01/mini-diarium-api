-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2020 at 08:26 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_diarium`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `name` text NOT NULL,
  `status` int(11) NOT NULL,
  `created` varchar(24) NOT NULL,
  `updated` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `user_id`, `name`, `status`, `created`, `updated`) VALUES
('A1EPJCEFCU', '123456', 'test edit modal aktifitas dan presensi', 2, '2020-12-15T14:21:42.174Z', '2020-12-18T16:02:05.368Z'),
('A1EPJCG9PI', '123456', 'hello', 3, '2020-12-15T14:22:41.970Z', '2020-12-18T16:32:45.337Z'),
('A1EPJCHOUU', '123456', 'bebas', 1, '2020-12-15T14:23:30.270Z', '2020-12-15T14:23:30.270Z'),
('A1EPJCIR6N', '123456', 'test', 1, '2020-12-15T14:24:05.335Z', '2020-12-15T14:24:05.335Z'),
('A1EPREPLDQ', '970037', 'Melakukan pengujian ODP Soliid', 3, '2020-12-18T17:36:41.402Z', '2020-12-18T17:36:53.953Z'),
('A1EPTTNJN9', '970037', 'Submit Telkom Athon', 3, '2020-12-19T16:36:11.625Z', '2020-12-19T16:43:47.053Z'),
('A1EPTU560P', '970037', 'Test activity', 1, '2020-12-19T16:43:36.345Z', '2020-12-19T16:43:36.345Z'),
('A1EPTUOKMP', '970037', 'Exam HCIA', 2, '2020-12-19T16:54:13.977Z', '2020-12-19T16:54:29.322Z');

-- --------------------------------------------------------

--
-- Table structure for table `presences`
--

CREATE TABLE `presences` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `status` int(11) NOT NULL,
  `created` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `presences`
--

INSERT INTO `presences` (`id`, `user_id`, `status`, `created`) VALUES
('P1EPJJVDR1', '970037', 1, '2020-12-15T16:33:17.665Z'),
('P1EPJKFJPU', '970037', 2, '2020-12-15T16:42:08.062Z'),
('P1EPRE2N4Q', '123456', 1, '2020-12-18T17:24:09.498Z'),
('P1EPREIOAN', '970037', 1, '2020-12-18T17:32:54.999Z'),
('P1EPRFUSAV', '970037', 2, '2020-12-18T17:57:00.895Z'),
('P1EPTKE1VD', '970037', 1, '2020-12-19T13:53:41.357Z'),
('P1EPTSGDT0', '123456', 1, '2020-12-19T16:14:47.712Z'),
('P1EPTUPQAB', '970037', 2, '2020-12-19T16:54:52.491Z');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `email` text,
  `photo` text,
  `registered` varchar(24) DEFAULT NULL,
  `updated` varchar(24) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `photo`, `registered`, `updated`) VALUES
('010101', 'guest', 'Qg0hNbPN7NLGKTKHLEpGCv424Iyz+61YEf2Eavg+LQ8=', 'test@mail.com', NULL, '2020-05-10T12:01:39.524Z', '2020-05-10T12:01:39.524Z'),
('121212', 'Test', '7VcoapVGWAXXcRJETh4YZCF/dU8qrz5k5h/6zQWpgzg=', 'test@test.com', '', '2020-12-14T17:14:58.280Z', '2020-12-14T17:26:32.174Z'),
('123456', 'Test User', 'mPdsf6fDWqRMU4hQIKewxgJMvO+1tqGavhzREcDOiM8=', '123456@telkom.co.id', 'profile_photo_123456.png', '2020-05-10T12:01:39.524Z', '2020-12-19T15:35:34.198Z'),
('970037', 'Aldi Wiranata', 'OgbSS2F9R43wwZBoQsIpxIl+0GvimhMMarH0/f3NapY=', 'aldiw01@gmail.com', '', '2020-05-07T04:51:54.211Z', '2020-06-05T09:19:39.053Z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `presences`
--
ALTER TABLE `presences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
