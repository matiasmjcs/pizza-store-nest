import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProduct } from './entities/cart-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct]), ProductsModule],
  providers: [CartProductService, ProductsService],
  exports: [TypeOrmModule, CartProductService, ProductsModule],
})
export class CartProductModule {}
