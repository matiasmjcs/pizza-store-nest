import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(): Promise<ShoppingCart> {
    const cart = this.shoppingCartRepository.create();
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

  async addProduct(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    const product = await this.productRepository.findOneBy({
      id: updateShoppingCartDto.id,
    });
    if (!product) {
      throw new BadRequestException('no se a encontrado el producto');
    }
    const shoppingcart = await this.shoppingCartRepository.findOneBy({ id });
    if (!shoppingcart) {
      throw new BadRequestException('no se a encontrado el carro de compras');
    }
    return await this.shoppingCartRepository.save({
      id: shoppingcart.id,
      products: [...shoppingcart.products, product],
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
