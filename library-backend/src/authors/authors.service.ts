import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string }) {
    return this.prisma.author.create({
      data: { name: data.name },
    });
  }

  findAll() {
    return this.prisma.author.findMany({
      include: { books: true },
    });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  update(id: number, data: { name?: string }) {
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

 async remove(id: number) {
  const bookCount = await this.prisma.book.count({
    where: { authorId: id }
  });

  if (bookCount > 0) {
    throw new BadRequestException("Cannot delete author. They still have books.");
  }

  return this.prisma.author.delete({ where: { id } });
}

}
