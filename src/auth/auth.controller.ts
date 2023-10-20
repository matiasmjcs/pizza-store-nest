import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }
  @Post('login')
  async login(@Body() logindto: LoginDto, @Response() res) {
    const result = await this.authService.login(logindto);
    await res.cookie('accessToken', result.token, {
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.send(result);
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return this.authService.profile(req.user.email);
  }
}
