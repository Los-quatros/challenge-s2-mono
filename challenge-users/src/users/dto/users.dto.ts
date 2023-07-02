import {
  IsString,
  IsNotEmpty,
  IsEmpty,
  IsEmail,
  IsNumber,
} from "class-validator";
import { UserInterface } from "../users.interface";

export class CreateUserDto implements Omit<UserInterface, "id"> {
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
}

export class UpdateUserDto implements Partial<CreateUserDto> {
  password?: string | undefined;
}
