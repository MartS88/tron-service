// src/transactions/transactions.module.ts

// Nest js
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

// Services and controllers
import {TransactionsService} from "src/transactions/transactions.service";
import {TransactionsController} from "src/transactions/transactions.controller";
import {CheckIncomingPaymentTask} from "src/transactions/tasks/check-incoming-payment.task";

// Models
import {Transaction} from "src/transactions/models/transaction-model";
import {TronModule} from "src/tron/tron.module";
import {Wallet} from "src/tron/model/wallet-model";
import {RedisCacheModule} from "src/redis-cache/redis-cache.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Transaction,Wallet]),
        TronModule,
        RedisCacheModule,
    ],
    controllers: [TransactionsController],
    providers:
        [
            TransactionsService,
        // Crone tasks
        CheckIncomingPaymentTask
    ],
    exports: [TransactionsService,]
})
export class TransactionsModule {
}
