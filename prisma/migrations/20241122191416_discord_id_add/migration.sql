/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `Discord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordId` to the `Discord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discord` ADD COLUMN `discordId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Discord_discordId_key` ON `Discord`(`discordId`);
