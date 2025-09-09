import {
  IsOptional,
  IsBoolean,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateOrderLineDto } from './create-order-line.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsString()
  delivery_address?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderLineDto)
  orderLines?: CreateOrderLineDto[];
}
