import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; authorId: number }) {
    return this.prisma.book.create({
      data,
    });
  }

  findAll(filters: { authorId?: number; borrowed?: boolean }) {
    const where: any = {};

    // Filter by author
    if (filters.authorId) {
      where.authorId = filters.authorId;
    }

    // Filter by borrowed status
    if (filters.borrowed !== undefined) {
      where.borrow = filters.borrowed
        ? { some: { returnedAt: null } } // currently borrowed
        : { none: { returnedAt: null } }; // currently available
    }

    return this.prisma.book.findMany({
      where,
      include: {
        author: true,
        borrow: true, // FIXED
      },
    });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        borrow: true, // FIXED
      },
    });
  }

  update(id: number, data: { title?: string; authorId?: number }) {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const activeBorrow = await this.prisma.borrow.count({
      where: { bookId: id, returnedAt: null },
    });

    if (activeBorrow > 0) {
      throw new BadRequestException('Cannot delete book. It is currently borrowed.');
    }

    return this.prisma.book.delete({ where: { id } });
  }
}
