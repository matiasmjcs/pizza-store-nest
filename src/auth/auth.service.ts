import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {}
    async register(registerDto:RegisterDto){
        const useremail = await this.userService.findOneEmail(registerDto.email)
        const username = await this.userService.findOneUserName(registerDto.username)

        if(useremail){throw new BadRequestException("este email ya existe en a base de datos")}
        if(username){throw new BadRequestException("este username ya existe en a base de datos")}
        return await this.userService.createUser(registerDto)
    }
    async login(){
        return "login"
    }
}
