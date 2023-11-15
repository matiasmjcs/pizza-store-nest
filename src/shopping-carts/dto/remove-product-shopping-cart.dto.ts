import { IsNumber } from 'class-validator';
export class RemoveProductShoppingCartDto {
  @IsNumber()
  id: number;
}
