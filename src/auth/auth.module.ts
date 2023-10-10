import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ShoppingCartsModule } from 'src/shopping-carts/shopping-carts.module';
import { ShoppingCartsService } from 'src/shopping-carts/shopping-carts.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[UsersModule, ShoppingCartsModule, ProductsModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ShoppingCartsService]
})
export class AuthModule {}
