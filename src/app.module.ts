import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "user_crud",
    password: "root",
    database: "db_crud",
    autoLoadEntities: true,
    synchronize: true,
  }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ShoppingCartsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
