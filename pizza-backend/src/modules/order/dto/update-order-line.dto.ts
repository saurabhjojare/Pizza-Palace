import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderLineDto } from './create-order-line.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {
    @IsOptional()
    @IsNumber({}, { message: 'Order ID must be a number' })
    order_id?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Pizza ID must be a number' })
    pizza_id?: number;

    @IsOptional()
    @IsString({ message: 'Size must be a string' })
    size?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity?: number;
}