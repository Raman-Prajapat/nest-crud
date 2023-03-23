import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto, LoginUserDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(payload: AuthPayloadDto): string {
    return this.jwtService.sign(payload);
  }

  async login(data: LoginUserDto): Promise<any> {
    const user = await prisma.userMaster.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user instanceof Error) return new Error('System Error');

    if (!user) return new Error('User not found');

    const response = this.generateJwt({
      id: user.id,
      email: user.email,
    });

    return response;
  }
}
