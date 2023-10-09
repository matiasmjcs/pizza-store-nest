import { IsOptional } from "class-validator"
import { CreateProductDto } from "./create-product.dto"
import { PartialType } from "@nestjs/mapped-types"
import { Category } from "src/categories/entities/category.entity"

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    name: string

    @IsOptional()
    price: number
    
    @IsOptional()
    stock: number

    @IsOptional()
    category: string
}
