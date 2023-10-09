import { IsInt, IsPositive, IsString, Length } from "class-validator";
import { Category } from "src/categories/entities/category.entity";

export class CreateProductDto {
    @IsString()
    @Length(3, undefined)
    name: string

    @IsInt()
    @IsPositive()
    price: number

    @IsInt()
    @IsPositive()
    stock: number

    @IsString()
    category: string


}
