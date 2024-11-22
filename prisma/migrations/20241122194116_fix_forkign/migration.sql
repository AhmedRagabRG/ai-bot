-- DropForeignKey
ALTER TABLE `discord` DROP FOREIGN KEY `Discord_userId_fkey`;

-- AlterTable
ALTER TABLE `discord` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Discord` ADD CONSTRAINT `Discord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
