// src/tron/tron.service

// Other packages
import {v4 as uuidv4} from 'uuid';

// Nest js
import {Inject, Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {InjectModel} from "@nestjs/sequelize";

// Models
import {Wallet} from "src/tron/model/wallet-model";

// Types
import {Sequelize} from 'sequelize-typescript';
import {TronWeb} from 'tronweb';

// Dto
import {CreateWalletDto} from "src/tron/dto/create-wallet.dto";
import {TronWalletAccount} from "src/tron/types";
import {TronBlock} from "src/transactions/types";


@Injectable()
export class TronService {
    private readonly logger = new Logger(TronService.name);
    private tronWeb: TronWeb;

    constructor(
        private readonly configService: ConfigService,
        @Inject(Sequelize) private readonly sequelize: Sequelize,
        @InjectModel(Wallet) private walletRepository: typeof Wallet,
    ) {
        this.tronWeb = new TronWeb({
            fullHost: this.configService.get('TRON_FULL_HOST'),
            headers: {"TRON-PRO-API-KEY": this.configService.get('TRON_API_KEY')},
        });
    }

    async getLatestBlock(): Promise<TronBlock> {
        return await this.tronWeb.trx.getCurrentBlock();
    }

    async generateTronWallet(): Promise<TronWalletAccount> {
        const account = await this.tronWeb.createAccount();
        return {
            address: account.address.base58,
            privateKey: account.privateKey,
            publicKey: account.publicKey,
        }
    }

    async createWalletEntity(tronWallet: TronWalletAccount, dto: CreateWalletDto) {
        console.log('tronWa', tronWallet)
        console.log('dto', dto)
        const id = uuidv4();
        const ttl = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

        return await this.walletRepository.create({
            id,
            ...tronWallet,
            ...dto,
            ttl

        })
    }

}
