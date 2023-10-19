import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ShoppingCartsModule } from 'src/shopping-carts/shopping-carts.module';
import { ShoppingCartsService } from 'src/shopping-carts/shopping-carts.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ShoppingCartsModule,
    ProductsModule,
    CategoriesModule,
  ],
  providers: [UsersService, ShoppingCartsService, ProductsService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
