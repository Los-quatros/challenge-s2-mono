import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateSellerDto   {

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    description: string;
    
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    user_id: string;
    
    }

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
    products?: string[];
}

