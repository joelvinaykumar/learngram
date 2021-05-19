import { Controller, Get, Request, UseGuards } from '@nestjs/common';

// guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor() { }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

}
