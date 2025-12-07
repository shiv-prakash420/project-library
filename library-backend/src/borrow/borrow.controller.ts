import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  // Borrow a book
  @Post()
  borrowBook(
    @Body() dto: { userId: number; bookId: number }
  ) {
    return this.borrowService.borrowBook(dto.userId, dto.bookId);
  }

  // Return book
  @Post('return/:id')
  returnBook(@Param('id') id: string) {
    return this.borrowService.returnBook(+id);
  }

  // List all borrow records for a user
  @Get('user/:id')
  getUserBorrowed(@Param('id') userId: string) {
    return this.borrowService.userBorrowedBooks(+userId);
  }
}
