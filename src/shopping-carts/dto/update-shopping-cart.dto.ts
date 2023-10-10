import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsOptional } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
    @IsOptional()
    id:number
    products: Product[]
}
