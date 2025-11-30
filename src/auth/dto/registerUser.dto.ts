import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}