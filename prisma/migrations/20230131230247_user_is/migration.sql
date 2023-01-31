/*
  Warnings:

  - Added the required column `userId` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "userId" TEXT NOT NULL;
