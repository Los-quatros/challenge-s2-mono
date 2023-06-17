import { IsString, IsNotEmpty, Length, IsEmail, IsNumber } from 'class-validator';


export class CreateUserDto {
    
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
}

export class UpdateUserDto implements Partial<CreateUserDto>{}

export class resetPasswordDto {
    
        @IsString()
        @IsNotEmpty()
        @Length(6, 20)
        password: string;

}
