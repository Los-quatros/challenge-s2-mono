import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SellersDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}

