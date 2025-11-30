import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
    createUser(registerDto: RegisterUserDto){
        return { message: "User created successfully" };
    }
}
