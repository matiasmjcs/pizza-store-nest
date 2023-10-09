import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ShoppingCart } from "src/shopping-carts/entities/shopping-cart.entity";
export class CreateUserDto {
    @IsString()
    @MinLength(4)
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    password: string

    isVerified: boolean

    shoppingCart: ShoppingCart

}
