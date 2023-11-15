import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ShoppingCartsModule } from 'src/shopping-carts/shopping-carts.module';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ShoppingCartsModule, JwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, ShoppingCartsModule],
})
export class UserModule {}
