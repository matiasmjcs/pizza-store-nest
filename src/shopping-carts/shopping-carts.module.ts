import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingCart]),
    ProductsModule,
    CategoriesModule,
    CartProductModule,
  ],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
  exports: [ShoppingCartsService, CartProductModule],
})
export class ShoppingCartsModule {}
