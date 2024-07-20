import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data/data-source';

@Module({
    imports: [ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
            autoLoadEntities: true,
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
            factories: [__dirname + '/factories/**/*{.ts,.js}'],
            cli: {
              migrationsDir: __dirname + '/migrations/',
            },
          }),
          inject: [ConfigService],
        }),
      ]})
export class CoreModule {}
