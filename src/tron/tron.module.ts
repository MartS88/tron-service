// src/tron/tron.module.ts

// Nest js
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Services and controllers
import {TronService} from "src/tron/tron.service";
import { TronController } from './tron.controller';

// Models
import {Wallet} from "src/tron/model/wallet-model";
import {WalletExpirationTask} from "src/tron/tasks/wallet-expiration.task";

@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  controllers: [TronController],
  providers: [
      TronService,
    // Cron tasks
    WalletExpirationTask
  ],
  exports: [TronService],
})
export class TronModule {}