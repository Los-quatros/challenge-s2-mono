import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSellerDto   {

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    description: string;
    
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    userId: string;
    
    }

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
    products?: string[];
}

