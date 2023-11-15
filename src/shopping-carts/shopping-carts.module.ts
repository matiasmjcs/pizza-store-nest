import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart]), CartProductModule],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
  exports: [ShoppingCartsService, CartProductModule],
})
export class ShoppingCartsModule {}
