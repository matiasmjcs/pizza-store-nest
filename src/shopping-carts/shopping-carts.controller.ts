import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { AddProductShoppingCartDto } from './dto/add-product-shopping-cart.dto';
import { RemoveProductShoppingCartDto } from './dto/remove-product-shopping-cart.dto';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shoppingCartsService.findOne(id);
  }

  @Patch('addproduct/:id')
  async addProduct(
    @Param('id') idProduct: number,
    @Body() addProductShoppingCartDto: AddProductShoppingCartDto,
  ) {
    return await this.shoppingCartsService.addProduct(
      addProductShoppingCartDto.id,
      idProduct,
    );
  }

  @Patch('add/:id')
  async addOne(@Param('id') idProduct: number) {
    return await this.shoppingCartsService.addOne(idProduct);
  }

  @Delete('remove/:id')
  removeOne(
    @Param('id') id: number,
    @Body() body: RemoveProductShoppingCartDto,
  ) {
    return this.shoppingCartsService.removeOne(id, body.id);
  }

  @Delete(':id')
  removeAll(@Param('id') id: number) {
    return this.shoppingCartsService.clearCart(id);
  }
}
