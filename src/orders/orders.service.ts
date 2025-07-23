// src/orders/orders.service

// Other packages
import {v4 as uuidv4} from 'uuid';

// Nestjs
import {Inject, Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

// Sequelize
import {Sequelize} from "sequelize-typescript";
import {InjectModel} from "@nestjs/sequelize";
import {Transaction} from "sequelize";

// Services
import {TronService} from "src/tron/tron.service";

// Dto
import {CreateOrderDto} from "src/orders/dto/create-order.dto";

// Models
import {Order} from "src/orders/models/order-model";
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly tronService: TronService,
        @Inject(Sequelize) private readonly sequelize: Sequelize,
        @InjectModel(Order) private orderRepository: typeof Order,
    ) {
    }

    async createOrder(dto: CreateOrderDto, transaction?: Transaction) {
        const id = uuidv4();
        return await this.orderRepository.create(
            { id, ...dto },
            { transaction }
        );
    }


    async createOrderWithWallet(dto: CreateOrderDto) {
        const transaction: Transaction = await this.sequelize.transaction();
        try {
            const order = await this.createOrder(dto,transaction)
            const tronWallet = await this.tronService.generateTronWallet();
            const walletEntity = await this.tronService.createWalletEntity(tronWallet, dto)

            await transaction.commit()

            return {
                message: `Send ${order.amountUsdt} to this wallet ${walletEntity.address}, this order is active only 30 minutes`
            }
        } catch (error: any) {
            await transaction.rollback();
            console.log('createOrderWithWallet error:', error);
            throw error;
        }
    }


    async updateOrder(id:string,dto:UpdateOrderDto) {
    const order = await this.orderRepository.findOne({where:{id}})
        if (order) {
            await order.update({ ...dto })
            return order
        }
        return null;
    }

    async deleteOrder(id:string) {
        const order = await this.orderRepository.findOne({where:{id}})
        await order.destroy()
    }
}

