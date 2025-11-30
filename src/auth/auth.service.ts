import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async registerUser(registerDto: RegisterUserDto){
        console.log("user data: ", registerDto);

        // hash password
        const hashPassword = await bcrypt.hash(registerDto.password, 10);
        
        // create user
        const user = await  this.userService.createUser({...registerDto, password: hashPassword});
        
        // jwt token
        const payload = {sub: user._id}
        const token = await this.jwtService.signAsync(payload);
        console.log("token: ", token);
        

        return token;
    }
}
