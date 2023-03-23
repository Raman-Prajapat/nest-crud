import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    const response = await this.authService.login(body);

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
