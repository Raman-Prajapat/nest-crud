import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto/outer.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class OuterService {
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 5;
    const hash: string = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async registerUser(body: RegisterUserDto): Promise<any> {
    const user = await prisma.userMaster.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user instanceof Error) return new Error('System Error');

    if (user) return 'User Already Registered';

    const createUser = await prisma.userMaster.create({
      data: { ...body, password: await this.hashPassword(body.password) },
    });
    if (createUser instanceof Error) {
      return new Error('System Error');
    }
    return 'Registered Successfully';
  }
}
