/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - The required column `uid` was added to the `chats` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_chatId_fkey`;

-- AlterTable
ALTER TABLE `chats` ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `history` MODIFY `chatId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `chats_uid_key` ON `chats`(`uid`);

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `chats`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
