import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

// dtos
import { UserDTO } from './dto/users.dto';
// guards
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
// services
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('signup')
  signUp(@Body() input: UserDTO) {
    return this.userService.signUp(input);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async logIn(@Request() req) {
    return await req.user;
  }

}
