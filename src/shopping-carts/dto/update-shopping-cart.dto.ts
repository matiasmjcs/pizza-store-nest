import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsOptional } from 'class-validator';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
    @IsOptional()
    id:number
}
