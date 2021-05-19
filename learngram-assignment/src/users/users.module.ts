import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from './schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name : "Users", schema : UserSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_CONSTANT,
      signOptions: {
        expiresIn: `${60*60*6}s`,
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
