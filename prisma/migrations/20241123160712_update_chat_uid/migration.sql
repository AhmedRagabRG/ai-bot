/*
  Warnings:

  - The primary key for the `chats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `chats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chats` DROP FOREIGN KEY `chats_userId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_chatId_fkey`;

-- DropIndex
DROP INDEX `chats_uid_key` ON `chats`;

-- AlterTable
ALTER TABLE `chats` DROP PRIMARY KEY,
    DROP COLUMN `uid`,
    DROP COLUMN `userId`,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `chats_id_key` ON `chats`(`id`);

-- AddForeignKey
ALTER TABLE `chats` ADD CONSTRAINT `chats_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `chats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
