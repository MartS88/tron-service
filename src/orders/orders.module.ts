// src/orders/orders.module.ts

// Nest js
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

// Services and controllers
import {OrdersService} from "src/orders/orders.service";
import {OrdersController} from "src/orders/orders.controller";

// Models
import {Order} from "src/orders/models/order-model";
import {TronModule} from "src/tron/tron.module";
import {Wallet} from "src/tron/model/wallet-model";


@Module({
    imports: [
        SequelizeModule.forFeature([Order,Wallet]),
        TronModule,
    ],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {
}
