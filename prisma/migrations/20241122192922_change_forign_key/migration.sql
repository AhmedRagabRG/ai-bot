-- DropForeignKey
ALTER TABLE `chats` DROP FOREIGN KEY `chats_userId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_userId_fkey`;

-- AlterTable
ALTER TABLE `chats` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `history` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `chats` ADD CONSTRAINT `chats_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
