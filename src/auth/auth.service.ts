import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(registerDto: RegisterDto) {
    const user = await this.userService.findOneEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('este email ya existe en a base de datos');
    }
    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);
    return await this.userService.createUser({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });
  }
  async login(logindto: LoginDto) {
    const user = await this.userService.findOneEmail(logindto.email);
    const isUser = await bcryptjs.compare(logindto.password, user.password);
    if (!isUser) {
      throw new BadRequestException('credenciales incorrectas');
    }
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      email: user.email,
    };
  }
}
