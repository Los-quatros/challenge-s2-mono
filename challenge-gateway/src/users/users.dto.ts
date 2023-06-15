import { IsString, IsNotEmpty, IsEmpty, IsEmail, IsNumber } from 'class-validator';


export class CreateUserDto {
    
        @IsEmail()
        @IsNotEmpty()
        email: string;
    
        @IsString()
        @IsNotEmpty()
        password: string;
    
        @IsString()
        @IsNotEmpty()
        firstName: string;
    
        @IsString()
        @IsNotEmpty()
        lastName: string;

        @IsNumber()
        age: number;
}

export class UpdateUserDto implements Partial<CreateUserDto>{}
