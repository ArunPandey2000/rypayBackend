import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { OtpFlowService } from 'src/otp-flow/services/otp-flow.service';
import { UsersService } from 'src/users/services/users.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { OtpInfo } from 'src/core/entities/otp-info.entity';
import { OtpRepository } from './repository/otp.repository';

@Module({
  providers: [AuthService, OtpFlowService, UsersService, OtpRepository],
  imports: [ConfigModule, JwtModule, TypeOrmModule.forFeature([User, OtpInfo])],
  controllers: [AuthController,]
})
export class AuthModule { }
