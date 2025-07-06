import {
  ValidateIf,
  IsIn,
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters' })
  first_name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters' })
  last_name: string;

  @ValidateIf((o) => o.role !== 'admin')
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
  address: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
  phone_number: string;

  @IsNotEmpty({ message: 'Email address is required' })
  @IsEmail({}, { message: 'Email address must be a valid email' })
  @Length(1, 255, {
    message: 'Email address must be between 1 and 255 characters',
  })
  email_address: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  @IsIn(['customer', 'admin'], {
    message: 'Role must be either customer or admin',
  })
  role: string;
}
