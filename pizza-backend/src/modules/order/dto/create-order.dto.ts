import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderLineDto } from './create-order-line.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @IsNotEmpty()
  @IsString({ message: 'Delivery address must be a string' })
  delivery_address: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  status: string;

  @IsNotEmpty({ message: 'Order lines are required' })
  @IsArray({ message: 'Order lines must be an array' })
  @ValidateNested({
    each: true,
    message: 'Each item must be a valid CreateOrderLineDto',
  })
  @Type(() => CreateOrderLineDto)
  orderLines: CreateOrderLineDto[];
}
