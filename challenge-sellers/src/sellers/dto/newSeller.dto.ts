import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class NewSellerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  sellerCode: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isEnabled: boolean;
}