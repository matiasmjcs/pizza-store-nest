import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
export class RegisterDto {
    @IsString()
    @MinLength(4)
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string


}
