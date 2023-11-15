import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { ProductsService } from 'src/products/products.service';
import { ICartProduct } from './interfaces/shopping-cart';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    private readonly cartProductService: CartProductService,
    private readonly productsService: ProductsService,
  ) {}
  async create(): Promise<ShoppingCart> {
    const cart = new ShoppingCart();
    return await this.shoppingCartRepository.save(cart);
  }

  async addIdUser(user: User, id: number) {
    const cart = await this.shoppingCartRepository.findOneBy({ id });
    return await this.shoppingCartRepository.save({ ...cart, user });
  }

  async findAll() {
    return await this.shoppingCartRepository.find();
  }

  async findOne(id: number) {
    return await this.shoppingCartRepository.findOneBy({ id });
  }

  async addProduct(idCart: number, idProduct: number) {
    try {
      const cart = await this.shoppingCartRepository.findOneBy({ id: idCart });
      if (!cart) {
        throw new BadRequestException('cart not found');
      }
      let productAlreadyInCart = false;
      for (const cartProduct of cart.cartProducts) {
        if (cartProduct.product.id === idProduct) {
          productAlreadyInCart = true;
          break;
        }
      }
      if (productAlreadyInCart) {
        throw new BadRequestException('Product already in cart', {
          cause: new Error(),
          description: 'Product already in cart',
        });
      }
      const product = await this.productsService.findOne(idProduct);
      if (!product) {
        throw new BadRequestException('product not found');
      }
      const newcartProduct = await this.cartProductService.create(
        cart,
        product,
      );
      return await this.shoppingCartRepository.save({
        ...cart,
        cartProducts: [...cart.cartProducts, newcartProduct],
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
    }
  }

  async addOne(idProduct: number) {
    try {
      return await this.cartProductService.addOne(idProduct);
    } catch (error) {
      console.log(error);
    }
  }

  async removeOne(id: number, idProduct: number) {
    const cart = await this.shoppingCartRepository.findOneBy({ id });
    if (!cart) {
      throw new Error('Cart not found');
    }
    const productToRemove = cart.cartProducts.find(
      (cartProduct: ICartProduct) => {
        return cartProduct.id === idProduct;
      },
    );
    if (!productToRemove) {
      throw new Error('Product not found in cart');
    }
    if (productToRemove.quantity > 1) {
      cart.cartProducts.forEach(async (cartProduct) => {
        if (cartProduct.id === productToRemove.id) {
          await this.cartProductService.removeOne(productToRemove.id);
        }
      });
    } else {
      return await this.shoppingCartRepository.save({
        ...cart,
        cartProducts: cart.cartProducts.filter((cartProduct: ICartProduct) => {
          return cartProduct.id !== idProduct;
        }),
      });
    }
  }

  async clearCart(id: number) {
    const cart = await this.shoppingCartRepository.findOneBy({ id });
    return await this.shoppingCartRepository.save({
      ...cart,
      cartProducts: [],
    });
  }
}
