import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    role?: Role;
  }) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role ?? Role.VIEWER,
      },
    });
  }

  async setRefreshTokenHash(
    userId: string,
    refreshTokenHash: string | null,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
      select: { id: true, name: true, email: true },
    });
  }
}
