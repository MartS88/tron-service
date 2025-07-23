// auth/dto/create-order.dto.ts

import { IsUUID, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsUUID()
    readonly userId: string;

    @IsNumber()
    readonly amountUsdt: number;
}
