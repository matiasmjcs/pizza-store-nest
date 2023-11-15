import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { AuthModule } from './auth/auth.module';
import { CartProductService } from './cart-product/cart-product.service';
import { CartProductModule } from './cart-product/cart-product.module';
import { User } from './users/entities/user.entity';
import { ShoppingCart } from './shopping-carts/entities/shopping-cart.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { CartProduct } from './cart-product/entities/cart-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      entities: [User, ShoppingCart, Product, Category, CartProduct],
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UserModule,
    ProductsModule,
    CategoriesModule,
    ShoppingCartsModule,
    AuthModule,
    CartProductModule,
  ],
  controllers: [],
  providers: [CartProductService],
})
export class AppModule {}
