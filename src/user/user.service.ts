import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}
  async loginUser(data: LoginUserDto) {
    const user = await prisma.userMaster.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user instanceof Error) return new Error('System Error');

    if (!user) return new Error('User not found');

    const response = this.authService.generateJwt({
      id: user.id,
      email: user.email,
    });

    return response;
  }
}
