import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    const response = await this.userService.loginUser(body);

    if (response instanceof Error) {
      return {
        status: 0,
        data: null,
        error: response,
      };
    } else {
      return {
        status: 0,
        data: response,
        error: null,
      };
    }
  }
}
