import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; }) {
    // const hashed = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
  const activeBorrow = await this.prisma.borrow.count({
    where: { userId: id, returnedAt: null }
  });
  if (activeBorrow > 0) {
    throw new BadRequestException(
      "User cannot be deleted because they currently have unreturned borrowed books."
    );
  }
  return this.prisma.user.delete({ where: { id } });
}

}
