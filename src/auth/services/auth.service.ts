import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { VerifyPhoneResponse } from '../dto/verify-phone-response.dto';
import { OtpFlowService } from 'src/otp-flow/services/otp-flow.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private otpFlowService: OtpFlowService,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async verifyPhone(phone: string): Promise<VerifyPhoneResponse> {
    const userData = await this.userRepo.findOne({
      where: {
        phoneNumber: phone
      }
    })
    this.otpFlowService.sendOtp(phone);
    if (userData) {
      return {
        isUserRegistered: true
      }
    }
    return {
      isUserRegistered: false
    }
  }
//   async signUp(createUserDto: CreateUserDto): Promise<any> {
//     // Check if user exists
//     const userExists = await this.usersService.findByPhoneNumber(
//       createUserDto.phone,
//     );
//     if (userExists) {
//       throw new BadRequestException('User already exists');
//     }

//     // Hash password
//     const hash = await this.hashData(createUserDto.password);
//     const newUser = await this.usersService.create({
//       ...createUserDto,
//       password: hash,
//     });
//     const tokens = await this.getTokens(newUser._id, newUser.phoneNumber, newUser.username);
//     await this.updateRefreshToken(newUser._id, tokens.refreshToken);
//     return tokens;
//   }

// 	async signIn(data: AuthUserDto) {
//     // Check if user exists
//     const user = await this.usersService.findByUsername(data.username);
//     if (!user) throw new BadRequestException('User does not exist');
//     const passwordMatches = await argon2.verify(user.password, data.password);
//     if (!passwordMatches)
//       throw new BadRequestException('Password is incorrect');
//     const tokens = await this.getTokens(user._id, user.username);
//     await this.updateRefreshToken(user._id, tokens.refreshToken);
//     return tokens;
//   }

// 	async logout(userId: string) {
//     return this.usersService.update(userId, { refreshToken: null });
//   }

//   hashData(data: string) {
//     return argon2.hash(data);
//   }

//   async updateRefreshToken(userId: string, refreshToken: string) {
//     const hashedRefreshToken = await this.hashData(refreshToken);
//     await this.usersService.update(userId, {
//       refreshToken: hashedRefreshToken,
//     });
//   }

//   async getTokens(userId: string, phoneNumber: string, username: string) {
//     const [accessToken, refreshToken] = await Promise.all([
//       this.jwtService.signAsync(
//         {
//           sub: userId,
//           phone: phoneNumber,
//           username,
//         },
//         {
//           secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
//           expiresIn: '6h',
//         },
//       ),
//       this.jwtService.signAsync(
//         {
//           sub: userId,
//           username,
//         },
//         {
//           secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
//           expiresIn: '30d',
//         },
//       ),
//     ]);

//     return {
//       accessToken,
//       refreshToken,
//     };
//   }
}