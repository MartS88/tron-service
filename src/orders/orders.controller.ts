// src/orders/orders.controller

// Nest js
import { Body, Controller, Patch, Post } from '@nestjs/common';

// Services
import { OrdersService } from 'src/orders/orders.service';
import { TronService } from 'src/tron/tron.service';

// Routes
import { ORDERS } from 'src/orders/orders.routes';

// Dto
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';


@Controller(ORDERS.CONTROLLER)
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly tronService: TronService,
  ) {
  }

  @Post(ORDERS.ROUTES.CREATE)
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrderWithWallet(dto);
  }

  @Patch(ORDERS.ROUTES.UPDATE)
  async updateOrder(id: string,dto:UpdateOrderDto) {
    await this.ordersService.updateOrder(id,dto);
  }

  OK
  @Patch(ORDERS.ROUTES.DELETE)
  async deleteOrder(id: string) {
    await this.ordersService.deleteOrder(id);
  }


}
