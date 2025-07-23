// src/tron/tasks/wallet-expiration.task.ts

// Nest js
import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {InjectModel} from '@nestjs/sequelize';
import {Op} from "sequelize";

// Models
import {Wallet} from 'src/tron/model/wallet-model';

// Types
import {WalletStatus} from "src/tron/types";

@Injectable()
export class WalletExpirationTask {
    constructor(
        @InjectModel(Wallet)
        private walletRepository: typeof Wallet,
    ) {
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async expireWallets() {
        const now = new Date();
        console.log('CronExpression.EVERY_30_SECONDS',now)
        const expiredWallets = await this.walletRepository.findAll({
            where: {
                status: WalletStatus.ACTIVE,

                ttl: {
                    [Op.lt]: now,
                },
            },
            include: ['order'],
        });

        if (expiredWallets.length) {
            const ids = expiredWallets.map(w => w.id);
            await this.walletRepository.update(
                { status: WalletStatus.EXPIRED },
                {
                    where: {
                        id: { [Op.in]: ids },
                    },
                },
            );

            console.log(`Deactivated ${expiredWallets.length} wallets.`);
        }
    }
}
