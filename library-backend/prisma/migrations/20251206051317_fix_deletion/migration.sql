/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_userId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Borrow" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "bookId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
