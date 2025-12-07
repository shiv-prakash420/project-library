import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';


@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  // Borrow a book
  async borrowBook(userId: number, bookId: number) {
    // Check if book is already borrowed
    const activeBorrow = await this.prisma.borrow.findFirst({
      where: { bookId, returnedAt: null },
    });

    if (activeBorrow) {
      throw new BadRequestException('Book is already borrowed');
    }

    return this.prisma.borrow.create({
      data: {
        userId,
        bookId,
      },
    });
  }

  // Return a book
  async returnBook(borrowId: number) {
    return this.prisma.borrow.update({
      where: { id: borrowId },
      data: {
        returnedAt: new Date(),
      },
    });
  }

 // Get all active (not returned) borrowed books for a user
async userBorrowedBooks(userId: number) {
  return this.prisma.borrow.findMany({
    where: {
      userId,
      returnedAt: null,   // 
    },
    include: {
      book: true,
    },
  });
}

}
