import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) throw new UnauthorizedException("Invalid email or password");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException("Invalid email or password");

    const token = await this.jwtService.signAsync({
      id: admin.id,
      email: admin.email,
      role: "admin",
    });

    return {
      message: "Admin login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
  async createAdmin(data: { name: string; email: string; password: string }) {
  const hash = await bcrypt.hash(data.password, 10);

  return this.prisma.admin.create({
    data: {
      name: data.name,
      email: data.email,
      password: hash,
    },
  });
}


}
