import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { BorrowModule } from './borrow/borrow.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthorsModule,
    BooksModule,
    UsersModule,
    BorrowModule,
    AuthModule,
  ],
})
export class AppModule {}
