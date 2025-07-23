// src/transactions/tasks/check-incoming-payment.task.ts

// Nest js
import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';

// Services
import {TronService} from "src/tron/tron.service";
import {TransactionsService} from "src/transactions/transactions.service";
import {RedisCacheService} from "src/redis-cache/redis-cache.service";

@Injectable()
export class CheckIncomingPaymentTask {
    constructor(
        private transactionService: TransactionsService,
        private tronService: TronService,
        private redisCacheService: RedisCacheService,
    ) {
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async checkIncomingUsdtTransactions() {
        let latestCheckedBlock = await this.redisCacheService.get('latestCheckedBlock')

        if (!latestCheckedBlock) {
            const currentBlock = await this.tronService.getLatestBlock();
            const blockNumber = currentBlock.block_header.raw_data.number;

            await this.redisCacheService.set('latestCheckedBlock', blockNumber, 300);
            latestCheckedBlock = blockNumber;
        }
        console.log('latestCheckedBlock', latestCheckedBlock)
        return await this.transactionService.checkIncomingUsdtTransactions(Number(latestCheckedBlock))
    }
}
