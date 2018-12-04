-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 04 Gru 2018, 16:44
-- Wersja serwera: 10.1.37-MariaDB
-- Wersja PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `test`
--



-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opcje`
--

CREATE TABLE `opcje` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `content` text NOT NULL,
  `stworzyl` text NOT NULL,
  `aktywna` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `opcje`
--

INSERT INTO `opcje` (`id`, `type`, `content`, `stworzyl`, `aktywna`) VALUES
(1, 'PIN', '1234', 'admin', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pytania`
--

CREATE TABLE `pytania` (
  `id` int(11) NOT NULL,
  `idtestu` int(11) NOT NULL,
  `tresc` text NOT NULL,
  `odpA` text NOT NULL,
  `odpB` text NOT NULL,
  `odpC` text NOT NULL,
  `odpD` text NOT NULL,
  `poprawna` text NOT NULL,
  `imgSrc` text,
  `imgW` float DEFAULT NULL,
  `imgH` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `pytania`
--

INSERT INTO `pytania` (`id`, `idtestu`, `tresc`, `odpA`, `odpB`, `odpC`, `odpD`, `poprawna`, `imgSrc`, `imgW`, `imgH`) VALUES
(1, 1, 'Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', 'Zbiornik retencyjny', 'Zbiornik retencyjny1231', 'Zbiornik retencyjny2313132', 'Zbiornik retencyjny4234234', '1', NULL, NULL, NULL),
(2, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(3, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(4, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(5, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(6, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(7, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(8, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(9, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(10, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(11, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(12, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(13, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(14, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(15, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(16, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(17, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(18, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(19, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(20, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(21, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL),
(22, 1, ' Na podstawie danych zawartych w tabeli okre?l, przy jakiej szeroko?ci dna i jakiej g??boko?ci wykopów tymczasowych wykonywanych w gruntach kategorii III nale?y przyj?? pochylenie skarp 1 : 0,71. ', ' Zbiornik retencyjny', ' Zbiornik retencyjny2fdsfsd', ' Zbiornik retencyjnyretert', ' Zbiornik retencyjny3453453453', '3', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `testy`
--

CREATE TABLE `testy` (
  `id` int(11) NOT NULL,
  `nazwa` text NOT NULL,
  `iloscPytan` int(11) NOT NULL,
  `klasa` text NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `testy`
--

INSERT INTO `testy` (`id`, `nazwa`, `iloscPytan`, `klasa`, `data`) VALUES
(1, 'Test nr1 ', 10, '1', '2018-11-24'),
(11, '1', 1, '1', '2018-11-03'),
(12, '1', 1, '1', '2018-11-03');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `opcje`
--
ALTER TABLE `opcje`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `pytania`
--
ALTER TABLE `pytania`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `testy`
--
ALTER TABLE `testy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `opcje`
--
ALTER TABLE `opcje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `pytania`
--
ALTER TABLE `pytania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT dla tabeli `testy`
--
ALTER TABLE `testy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
