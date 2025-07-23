// wallet-model.ts

// Sequelize
import {Column, DataType, Model, Table, ForeignKey, BelongsTo} from 'sequelize-typescript';

// Models
import {Order} from "src/orders/models/order-model";
import {OrderStatus} from "src/orders/types/order";
import {WalletStatus} from "src/tron/types";


@Table({
    tableName: 'wallets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Wallet extends Model<Wallet> {
    @Column({type: DataType.UUID, unique: true, primaryKey: true, allowNull: false})
    id: number;

    @Column({type: DataType.STRING(128), unique: true, allowNull: false})
    address: string;

    @Column({type: DataType.TEXT, allowNull: false, field: 'public_key'})
    publicKey: string;

    @Column({type: DataType.TEXT, allowNull: false, field: 'private_key'})
    privateKey: string;

    @Column({type: DataType.UUID, allowNull: false, field: 'user_id'})
    userId: string;

    @ForeignKey(() => Order)
    @Column({type: DataType.UUID, allowNull: true})
    order_id: string;

    @BelongsTo(() => Order)
    order: Order;

    @Column({
        type: DataType.ENUM(...Object.values(WalletStatus)),
        allowNull: false,
        defaultValue: WalletStatus.ACTIVE,
    })
    status: WalletStatus;

    @Column({type: DataType.DATE, allowNull: true})
    ttl: Date;

}
