// order-model.ts

// Sequelize
import {Column, DataType, Model, Table, HasMany} from 'sequelize-typescript';

// Models
import {Wallet} from "src/tron/model/wallet-model";

// Types
import {OrderStatus} from "src/orders/types/order";

@Table({
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Order extends Model<Order> {
    @Column({type: DataType.UUID, unique: true, primaryKey: true, allowNull: false})
    id: number;

    @Column({type: DataType.UUID, allowNull: false,field: 'user_id'})
    userId: string;

    @Column({type: DataType.DECIMAL(18, 6), allowNull: false,field: 'amount_usdt'})
    amountUsdt: number;

    @Column({
        type: DataType.ENUM(...Object.values(OrderStatus)),
        allowNull: false,
        defaultValue: OrderStatus.PENDING
    })
    status: OrderStatus;


    @HasMany(() => Wallet)
    wallets: Wallet[];
}