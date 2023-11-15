import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ShoppingCartsService } from 'src/shopping-carts/shopping-carts.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly shoppingCartService: ShoppingCartsService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const shoppingCart = await this.shoppingCartService.create();
    if (!shoppingCart) {
      throw new BadRequestException('shopping cart not created');
    }
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.isVerified = false;
    user.shoppingCart = shoppingCart;
    await this.shoppingCartService.addIdUser(user, shoppingCart.id);
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
