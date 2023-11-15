import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsNumber } from 'class-validator';

export class AddProductShoppingCartDto extends PartialType(
  CreateShoppingCartDto,
) {
  @IsNumber()
  id: number;
}
