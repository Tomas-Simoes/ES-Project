import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('JWT_SECRET set?', !!process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "se_project",
    });
  }

  validate(payload: any) {
    console.log("TESTE");
      console.log('JWT payload:', payload);

    return { userId: payload.sub, email: payload.email, name: payload.name, role: payload.role };
  }
}
