import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}
