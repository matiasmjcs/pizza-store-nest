import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ShoppingCartsService } from 'src/shopping-carts/shopping-carts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly shoppingCartService: ShoppingCartsService,
  ) { }
  
  async createUser(createUserDto: CreateUserDto) {
    const shoppingCart = await this.shoppingCartService.create()
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      isVerified: false, shoppingCart
    })
    await this.shoppingCartService.addIdUser(user, shoppingCart.id)
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneEmail(email:string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneUserName(username:string) {
    return await this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
