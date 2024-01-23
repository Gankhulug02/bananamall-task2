/*
  Warnings:

  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Costumer_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `Product_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `Total` on the `Orders` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_Costumer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_Product_id_fkey`;

-- AlterTable
ALTER TABLE `Orders` DROP PRIMARY KEY,
    DROP COLUMN `Costumer_id`,
    DROP COLUMN `Product_id`,
    DROP COLUMN `Total`,
    ADD COLUMN `customer_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `product_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `total` INTEGER NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Products` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Users` DROP PRIMARY KEY,
    ADD COLUMN `image_url` VARCHAR(255) NOT NULL DEFAULT 'https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_email_key` ON `Users`(`email`);

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
