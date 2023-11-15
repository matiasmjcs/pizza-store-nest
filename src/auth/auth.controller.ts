import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }
  @Post('login')
  async login(@Body() logindto: LoginDto) {
    return await this.authService.login(logindto);
  }
}
