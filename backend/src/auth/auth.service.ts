import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user.id, name: user.name, email: user.email };

    const access_token = await this.jwt.signAsync(payload);

    const refresh_token = await this.jwt.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    const refreshHash = await bcrypt.hash(refresh_token, 10);
    await this.usersService.setRefreshTokenHash(user.id, refreshHash);

    return {
      access_token,
      refresh_token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async logout(userId: string) {
    await this.usersService.setRefreshTokenHash(userId, null);
    return { ok: true };
  }
}
