import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}
  async create(createShoppingCartDto: CreateShoppingCartDto) {
    const cart = this.shoppingCartRepository.create(createShoppingCartDto)
    return await this.shoppingCartRepository.save(cart);
  }

  async findAll() {
    return await this.shoppingCartRepository.find();
  }

  async findOne(id: number) {
    return await this.shoppingCartRepository.findOneBy({id});
  }

  async update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    const product = await this.productRepository.findOneBy({id: updateShoppingCartDto.id})
    const shoppingcart = await this.shoppingCartRepository.findOneBy({id})
    return await this.shoppingCartRepository.save({...shoppingcart, products: [...shoppingcart.products,product]});
  }

  async remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
