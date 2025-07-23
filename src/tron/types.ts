// src/tron/types/wallet-status.ts

export interface TronWalletAccount {
    address: string;
    privateKey: string;
    publicKey: string;
}


export enum WalletStatus {
    ACTIVE = 'active',
    PAID = 'paid',
    EXPIRED = 'expired',
}
