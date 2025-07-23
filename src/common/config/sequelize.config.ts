// src/common/config/sequelize.config.ts

// Nest js
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

// Models
import {Wallet} from "src/tron/model/wallet-model";
import {Order} from "src/orders/models/order-model";
import {Transaction} from "src/transactions/models/transaction-model";

export const SequelizeConfig = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<SequelizeModuleOptions> => {
    return {
      dialect: 'mysql',
      host: configService.get<string>('MYSQL_HOST'),
      port: configService.get<number>('MYSQL_PORT'),
      username: configService.get<string>('MYSQL_USERNAME'),
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_NAME'),
      models: [Wallet,Order,Transaction],
      dialectOptions: {
        // cert: {
        //   require: true,
        //   rejectUnauthorized: false,
        // },
      },
      pool: {
        max: 50,
        min: 10,
        acquire: 10000,
        idle: 5000,
      },
    };
  },
  inject: [ConfigService],
};
