
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ){
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return await this.userService.validateUser(email, password);
  }
}
