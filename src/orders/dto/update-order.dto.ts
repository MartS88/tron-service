// src/orders/dto/update-order.dto

import { IsOptional, IsEnum, IsUUID, IsNumberString } from 'class-validator';
import { OrderStatus } from '../types/order';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsNumberString()
  amountUsdt?: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
