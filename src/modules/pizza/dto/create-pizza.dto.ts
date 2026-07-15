import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePizzaDto {
  @IsNotEmpty({ message: 'Pizza name is required' })
  @IsString({ message: 'Pizza name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Pizza type is required' })
  @IsString({ message: 'Pizza type must be a string' })
  type: string;

  @IsNotEmpty({ message: 'Pizza image URL is required' })
  @IsString({ message: 'Pizza image URL must be a string' })
  imageUrl: string;
}
