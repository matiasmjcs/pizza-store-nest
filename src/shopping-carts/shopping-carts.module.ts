import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[TypeOrmModule.forFeature([ShoppingCart]), ProductsModule, CategoriesModule],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService, ProductsService],
  exports:[TypeOrmModule]
})
export class ShoppingCartsModule {}