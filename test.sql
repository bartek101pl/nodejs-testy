-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Lut 2019, 17:15
-- Wersja serwera: 10.1.37-MariaDB
-- Wersja PHP: 7.3.0

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
-- Struktura tabeli dla tabeli `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nazwa` text COLLATE utf8_polish_ci NOT NULL,
  `login` text COLLATE utf8_polish_ci NOT NULL,
  `haslo` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `admin`
--

INSERT INTO `admin` (`id`, `nazwa`, `login`, `haslo`) VALUES
(1, 'root', 'root', 'root');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `klasa`
--

CREATE TABLE `klasa` (
  `id` int(11) NOT NULL,
  `nazwa` text COLLATE utf8_polish_ci NOT NULL,
  `ile_Uczni` int(11) NOT NULL,
  `ilosc_testo` int(11) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opcje`
--

CREATE TABLE `opcje` (
  `id` int(11) NOT NULL,
  `type` text COLLATE utf8_polish_ci NOT NULL,
  `content` text COLLATE utf8_polish_ci NOT NULL,
  `stworzyl` text COLLATE utf8_polish_ci NOT NULL,
  `aktywna` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

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
  `tresc` text COLLATE utf8_polish_ci NOT NULL,
  `odpA` text COLLATE utf8_polish_ci NOT NULL,
  `odpB` text COLLATE utf8_polish_ci NOT NULL,
  `odpC` text COLLATE utf8_polish_ci NOT NULL,
  `odpD` text COLLATE utf8_polish_ci NOT NULL,
  `poprawna` text COLLATE utf8_polish_ci NOT NULL,
  `imgSrc` text COLLATE utf8_polish_ci,
  `imgW` float DEFAULT NULL,
  `imgH` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `testy`
--

CREATE TABLE `testy` (
  `id` int(11) NOT NULL,
  `nazwa` text COLLATE utf8_polish_ci NOT NULL,
  `iloscPytan` int(11) NOT NULL,
  `klasa` text COLLATE utf8_polish_ci NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uczniowie`
--

CREATE TABLE `uczniowie` (
  `id` int(11) NOT NULL,
  `imie` text COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` text COLLATE utf8_polish_ci NOT NULL,
  `klasa_id` int(11) NOT NULL,
  `haslo` text COLLATE utf8_polish_ci NOT NULL,
  `login` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `klasa`
--
ALTER TABLE `klasa`
  ADD PRIMARY KEY (`id`);

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
-- Indeksy dla tabeli `uczniowie`
--
ALTER TABLE `uczniowie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `klasa`
--
ALTER TABLE `klasa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT dla tabeli `opcje`
--
ALTER TABLE `opcje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `pytania`
--
ALTER TABLE `pytania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT dla tabeli `testy`
--
ALTER TABLE `testy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT dla tabeli `uczniowie`
--
ALTER TABLE `uczniowie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
