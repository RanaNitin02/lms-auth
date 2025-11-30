import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async registerUser(registerDto: RegisterUserDto){
        console.log("user data: ", registerDto);

        // hash password
        const hashPassword = await bcrypt.hash(registerDto.password, 10);
        

        return this.userService.createUser({...registerDto, password: hashPassword});
        
    }
}
