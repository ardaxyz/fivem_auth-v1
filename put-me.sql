CREATE TABLE `licenses` (
  `id` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `discordId` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `devip` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `expirenceAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `licenses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `licenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;