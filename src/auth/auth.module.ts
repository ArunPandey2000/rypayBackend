import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { OtpFlowModule } from 'src/otp-flow/otp-flow.module';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from 'src/core/entities/refresh-token';

@Global()
@Module({
  imports: [JwtModule.register({global: true}), TypeOrmModule.forFeature([User, RefreshToken]), OtpFlowModule],
  providers: [AuthService, TokenService, UsersService, ConfigService],
  controllers: [AuthController],
  exports: [TokenService]
})
export class AuthModule { }
