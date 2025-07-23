// app.module

// Other packages
import * as process from 'process';

// Nest js
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Modules
import { CacheModule } from '@nestjs/cache-manager';

// Winston
import { WinstonModule } from 'nest-winston';

// Config
import { createWinstonConfig } from './common/config/winston.config';
import { RedisConfig } from './common/config/redis.config';
import { SequelizeConfig } from './common/config/sequelize.config';

// Controllers and services for additional use (not part of other modules)
// Env
import { config as dotenvConfig } from 'dotenv';
import { TronModule } from './tron/tron.module';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import {ScheduleModule} from "@nestjs/schedule";
dotenvConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      expandVariables: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createWinstonConfig,
    }), // Winston logs config
    SequelizeModule.forRootAsync(SequelizeConfig), // Sequelize DB
    CacheModule.registerAsync(RedisConfig), // Redis DB
    ScheduleModule.forRoot(), // Schedule tasks

    TronModule,
    OrdersModule,
    TransactionsModule,
  ],
  providers: [
    Logger,
  ],
  controllers: [],
})
export class AppModule {
}

