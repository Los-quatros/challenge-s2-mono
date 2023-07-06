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

        image: any;


}

export class UpdateUserDto implements Partial<CreateUserDto>{}

export class resetPasswordDto {
    
        @IsString()
        @IsNotEmpty()
        @Length(6, 20)
        password: string;

}

export class UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    sellerId?: string;
    password: string;
    roles: string;
    activation_token?: string;
    resetPasswordToken?: string;
    avatar?: string;
}
