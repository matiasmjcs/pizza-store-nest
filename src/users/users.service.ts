import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const cart = this.shoppingCartRepository.create()
    
    const shoppingCart = await this.shoppingCartRepository.save(cart)

    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      isVerified: false, shoppingCart
    })

    const newCart = await this.shoppingCartRepository.findOneBy({ id: user.shoppingCart.id })

    await this.shoppingCartRepository.save({ ...newCart, user })

    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
