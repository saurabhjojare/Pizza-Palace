import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderLineDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'Pizza ID must be a number' })
  pizza_id: number;

  @IsNotEmpty({ message: 'Size is required' })
  @IsString({ message: 'Size must be a string' })
  size: string;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;
}
