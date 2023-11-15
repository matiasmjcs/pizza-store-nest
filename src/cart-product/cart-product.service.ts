import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {}
  async create(cart: ShoppingCart, product: Product) {
    try {
      if (!cart) {
        throw new Error('cart not found');
      }
      if (!product) {
        throw new Error('product not found');
      }
      const cartProduct = this.cartProductRepository.create({
        shoppingCart: cart,
        product,
        quantity: 1,
      });
      return await this.cartProductRepository.save(cartProduct);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all cartProduct`;
  }

  async findOne(id: number) {
    return await this.cartProductRepository.findOneBy({ id });
  }

  async removeOne(id: number) {
    const cartProduct = await this.cartProductRepository.findOneBy({ id });
    return await this.cartProductRepository.save({
      ...cartProduct,
      quantity: cartProduct.quantity - 1,
    });
  }

  async addOne(id: number) {
    const cartProduct = await this.cartProductRepository.findOneBy({ id });
    return await this.cartProductRepository.save({
      ...cartProduct,
      quantity: cartProduct.quantity + 1,
    });
  }

  async remove(id: number) {
    return await this.cartProductRepository.softDelete({ id });
  }
}
