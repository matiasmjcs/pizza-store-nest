import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartsService.addProduct(id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartsService.remove(+id);
  }
}
