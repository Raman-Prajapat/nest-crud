import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/outer.dto';
import { OuterService } from './outer.service';

@Controller()
export class OuterController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly outerService: OuterService) {}

  @Post('/register')
  async registerUser(@Body() body: RegisterUserDto): Promise<any> {
    const response = await this.outerService.registerUser(body);

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
