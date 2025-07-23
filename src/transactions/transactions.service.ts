// src/transactions/transactions.service

// Other packages
import { TronWeb } from 'tronweb';

// Nest js
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Wallet } from 'src/tron/model/wallet-model';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

// Sequelize
import { Sequelize } from 'sequelize-typescript';

// Types
import { OrderStatus } from 'src/orders/types/order';
import { WalletStatus } from 'src/tron/types';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
  private tronWeb: TronWeb;

  constructor(
    private readonly configService: ConfigService,
    @Inject(Sequelize) private readonly sequelize: Sequelize,
    @InjectModel(Wallet) private walletRepository: typeof Wallet,
  ) {
    this.tronWeb = new TronWeb({
      fullHost: this.configService.get('TRON_FULL_HOST'),
      headers: { 'TRON-PRO-API-KEY': this.configService.get('TRON_API_KEY') },
    });
  }

  async checkIncomingUsdtTransactions(latestCheckedBlock: number) {
    const contractAddress = this.tronWeb.address.fromHex('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'); // USDT (TRC-20)

    const response = await this.tronWeb.event.getEventsByContractAddress(contractAddress, {
      eventName: 'Transfer',
      blockNumber: latestCheckedBlock,
      onlyConfirmed: true,
    });

    for (const tx of response.data) {
      const to = this.tronWeb.address.fromHex(tx.result.to);
      const value = parseInt(tx.result.value) / 1e6;

      const wallets = await this.walletRepository.findAll({
        where: {
          address: to,
          status: 'active',
        },
        include: ['order'],
      });

      if (!wallets) {
        return;
      }

      for (const wallet of wallets) {
        // Update wallet and order status
        if (wallet.order && value >= wallet.order.amountUsdt) {
          wallet.status = WalletStatus.PAID;
          wallet.order.status = OrderStatus.PAID;

          await wallet.save();
          // Create message service to send notification about payment
          // awatit sendMessage(wallet.order.userId)
          this.logger.log(`Wallet ${wallet.address} marked as PAID for ${value} USDT`);
        }
      }
    }
  }

}
