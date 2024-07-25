import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { IntegrationModule } from './integration/integration.module';
import { OtpFlowModule } from './otp-flow/otp-flow.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    AuthModule,
    IntegrationModule,
    UsersModule,
    OtpFlowModule,
    IntegrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
