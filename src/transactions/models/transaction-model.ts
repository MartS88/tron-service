// transaction-model.ts

// Sequelize
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';

// Models
import {Order} from "src/orders/models/order-model";

@Table({
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Transaction extends Model<Transaction> {
    @Column({ type: DataType.UUID, unique: true, autoIncrement: true, primaryKey: true,allowNull: false})
    id: number;

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
        unique: true,
    })
    tx_hash: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    from_address: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    to_address: string;

    @Column({
        type: DataType.DECIMAL(18, 6),
        allowNull: false,
    })
    amount: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    confirmed: boolean;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    confirmations: number;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    order_id: string;

    @BelongsTo(() => Order)
    order: Order;
}
