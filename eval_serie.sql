-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 16 nov. 2023 à 09:17
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eval_serie`
--

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `idUser` int(11) NOT NULL,
  `idSerie` int(11) NOT NULL,
  `likes` tinyint(4) NOT NULL,
  `comments` text DEFAULT NULL,
  `maNote` int(11) NOT NULL,
  `enCours` tinyint(4) NOT NULL,
  `wishList` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`idUser`, `idSerie`, `likes`, `comments`, `maNote`, `enCours`, `wishList`) VALUES
(16, 25, 1, NULL, 0, 1, 1),
(17, 25, 1, '1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula', 7, 1, 1),
(17, 26, 1, NULL, 0, 1, 0),
(17, 27, 1, ' look like readable English. Many desktop publishing packages and web page ', 8, 1, 0),
(17, 28, 0, 'College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable ', 5, 0, 1),
(17, 29, 1, 'able. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat pre', 9, 2, 0),
(17, 30, 0, NULL, 7, 0, 1),
(17, 31, 0, 'a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubt', 7, 2, 0),
(17, 32, 0, 'mour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t ', 3, 0, 0),
(18, 25, 0, 's, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containi', 7, 1, 0),
(18, 26, 1, ' content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readabl', 0, 0, 1),
(18, 27, 0, '500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially un', 8, 2, 1),
(18, 28, 0, 'from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem', 9, 1, 1),
(18, 29, 1, 'ecimen book. It has survived not only five centuries, but also the leap in', 0, 2, 1),
(18, 30, 1, NULL, 4, 2, 1),
(18, 31, 1, NULL, 3, 1, 0),
(18, 32, 1, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `series`
--

CREATE TABLE `series` (
  `idSerie` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `resume` text NOT NULL,
  `numberSeason` int(11) NOT NULL,
  `still` tinyint(4) NOT NULL,
  `imdbNote` float NOT NULL,
  `sensCritiqueNote` float NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `series`
--

INSERT INTO `series` (`idSerie`, `title`, `poster`, `year`, `resume`, `numberSeason`, `still`, `imdbNote`, `sensCritiqueNote`, `country`) VALUES
(25, 'Le jeu de la dame', '1700121358947-le_jeu_de_la_dame.jpg', '2020', 'Le Jeu de la dame (The Queen\'s Gambit) est une mini-série américaine en sept parties d\'environ 56 minutes chacune, créée par Scott Frank et Allan Scott, adaptée du roman éponyme de Walter Tevis publié en 1983, et mise en ligne le 23 octobre 2020 sur Netflix. ', 2, 0, 7, 8, 'USA'),
(26, 'Breaking bad', '1700121451210-breaking_bad.png', '2008', 'Breaking Bad ou Breaking Bad : Le Chimiste1 au Québec est une série télévisée américaine en 62 épisodes de 47 minutes, créée par Vince Gilligan, diffusée simultanément du 20 janvier 2008 au 29 septembre 2013 sur AMC aux États-Unis et au Canada, et ensuite sur Netflix. ', 5, 1, 7, 8.5, 'Canada'),
(27, 'Chernobyl', '1700121495121-chernobyl.jpg', '2021', 'Chernobyl ou Tchernobyl au Québec est une mini-série télévisée dramatique historique britannico-américaine en cinq épisodes créée et écrite par Craig Mazin, réalisée par Johan Renck et diffusée du 6 mai au 3 juin 2019 sur HBO et Sky. En France, la série est diffusée à partir de mai 2019 sur OCS puis sur M6 en mai-juin 2021. ', 10, 0, 5, 6, 'Canada'),
(28, 'Dead to me', '1700121532137-dead_to_me.jpg', '2022', 'Dead to Me ou Morts à mes yeux au Québec est une série télévisée américaine à l\'humour noir en trois saisons de 10 épisodes d\'environ 30 minutes chacune, créée par Liz Feldman, et mise en ligne entre le 3 mai 2019 et le 17 novembre 2022 sur Netflix. Les personnages principaux sont joués par Christina Applegate et Linda Cardellini. La série est présentée comme une version humoristique de Big Little Lies1. ', 3, 0, 7, 7, 'Canada'),
(29, 'For all mankind', '1700121580771-for_all_mankind.jpg', '1989', 'For All Mankind est un film documentaire américain réalisé par Al Reinert en 1989 et traitant des missions Apollo de la NASA. ', 1, 0, 6, 5, 'USA'),
(30, 'Game of thrones', '1700121630627-game_of_thrones.jpg', '2019', 'Game of Thrones, également appelée Le Trône de ferb (selon le titre français de l\'œuvre romanesque dont elle est adaptée), est une série télévisée américaine de fantasy1 créée par David Benioff et D. B. Weiss, diffusée entre le 17 avril 2011 et le 19 mai 2019 sur HBO aux États-Unis en simultané sur HBO Canada au Canada.\r\n\r\nIl s\'agit de l\'adaptation de la série de romans écrits par George R. R. Martin depuis 1996, saga réputée pour son réalisme et par ses nombreuses inspirations tirées d’événements, lieux et personnages historiques réels, tels que la guerre des Deux-Roses, le mur d\'Hadrien ou Henri VII Tudor2. ', 3, 1, 8, 9, 'USA'),
(31, 'How i met your mother', '1700121682081-how_i_met_your_mother.jpg', '2001', 'How I Met Your Mother (littéralement « Comment j’ai rencontré votre mère ») ou Comment je l\'ai rencontrée au Québec est une série télévisée américaine en 208 épisodes de 22 minutes créée par Carter Bays et Craig Thomas et diffusée entre le 19 septembre 2001 et le 31 mars 2014 sur la chaîne CBS, et en simultané sur CH/E!2 (saisons 1 à 4) puis Citytv3 (saisons 5 à 9) au Canada. Depuis le 23 février 2021, elle est également disponible sur Disney+ (après avoir été disponible sur Prime Vidéo et Netflix auparavant). ', 9, 0, 8, 5, 'Canada'),
(32, 'Le bureau des legendes', '1700121792800-le_bureau_des_legendes.jpg', '2015', 'Le Bureau des légendes ou BDL est une série télévisée française en cinq saisons diffusées et cinquante épisodes de 52 minutes créée par Éric Rochant et diffusée entre le 27 avril 2015 et le 4 mai 2020 en France sur Canal+ et en Belgique à partir du 19 novembre 2017 sur La Une. ', 5, 0, 4, 3, 'France');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) NOT NULL,
  `verify` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `pseudo`, `email`, `password`, `avatar`, `admin`, `verify`) VALUES
(16, 'admin', 'admin@admin.com', '$2b$10$HyXIm7J85MNPf3lwBbkG8O6vHq2qRdy.i43IDjL0pZgqSBMeQ4G32', NULL, 1, 0),
(17, 'test', 'test@gmail.com', '$2b$10$4kLHDLXAzXw1rzsV2TU9CelvDulQPM.gVSh0KUJTTn6yQsv0N3KMW', '1700121958037-ball.png', 0, 0),
(18, 'test2', 'test2@gmail.com', '$2b$10$3OukTEplsYeaWwbFVc/9f.5BqkPtCM.ckl4kWVRdC6gO/ZToJOq9u', '1700122132008-Avatar.png', 0, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`idUser`,`idSerie`),
  ADD KEY `likes_series0_FK` (`idSerie`);

--
-- Index pour la table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`idSerie`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `series`
--
ALTER TABLE `series`
  MODIFY `idSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_series0_FK` FOREIGN KEY (`idSerie`) REFERENCES `series` (`idSerie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_users_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
