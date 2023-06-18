import { IsNotEmpty, IsString, IsEmail, Length, IsOptional, IsBoolean } from 'class-validator';

export class AccountSellerDto {   

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    user_id?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}