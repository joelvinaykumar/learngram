import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  Logger
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Compare, Crypt } from 'password-crypt';
import { Model } from 'mongoose';

import { UserDTO } from './dto/users.dto';
import { User } from './interface/users.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel("Users")
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp({ email, password }: UserDTO) {
    try {
      const hashedPassword = await Crypt(process.env.PASS_KEY, password);
      const newUser = new this.userModel({
        email,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });
      Logger.log(email, 'email')
      if (user) {
        const success = await Compare(process.env.PASS_KEY, password, user.password);
        if (success) {
          const { email } = user.toJSON();
          return {
            access_token: this.jwtService.sign({ email })
          };
        } else {
          throw new UnauthorizedException('Incorrect Password');
        }
      } else {
        throw new NotFoundException('User not found')
      }
    } catch (error) {
      throw new HttpException(error.message, error.http_code || 500);
    }
  }

}
