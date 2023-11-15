import { IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, undefined)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsString()
  category: string;
}
