import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

//services
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
// strategies
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
// controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    UserModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
