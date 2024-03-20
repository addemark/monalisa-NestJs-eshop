import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { FastifyRequest } from "fastify";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/authenticate/entity/user.entity";
import { UserRepository } from "src/authenticate/repositoryes/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    });
  }

  private static extractJWT(@Req() request: FastifyRequest): string | null {
    if (!request.cookies || !request.cookies.token) return null;
    return JSON.parse(request.cookies.token).accessToken;
  }

  async validate(payload: { encryptedUID: string }): Promise<User> {
    const { encryptedUID } = payload;
    const user = await this.userRepository.findOne({
      where: { id: encryptedUID, isDeleted: false, phoneVerified: true },
      // lock: { mode: 'optimistic', version: 1 },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
