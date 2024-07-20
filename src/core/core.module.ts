import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Document } from './entities/document.entity';
import { Merchant } from './entities/merchant.entity';
import { OtpInfo } from './entities/otp-info.entity';
import { Transaction } from './entities/transactions.entity';
import { Wallet } from './entities/wallet.entity';

@Module({
    imports: [ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: +configService.get<string>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [User, Address, Document, Merchant, OtpInfo, Transaction, Wallet],
            synchronize: true, // Disable in production
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User, Address, Document, Merchant, OtpInfo, Transaction, Wallet]),]
})
export class CoreModule {}
