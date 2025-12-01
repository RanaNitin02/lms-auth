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
    ) { }

    async registerUser(registerDto: RegisterUserDto) {
        console.log("user data: ", registerDto);

        // hash password
        const hashPassword = await bcrypt.hash(registerDto.password, 10);

        // create user
        const user = await this.userService.createUser({ ...registerDto, password: hashPassword });

        // jwt token
        const payload = { sub: user._id, role: "admin" }
        const token = await this.jwtService.signAsync(payload);
        console.log("token: ", token);


        return token;
    }

    async loginUser(email: string, password: string) {
        // find user by email
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // compare password 
        const isMatch = await bcrypt.compare(password, (user as any).password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // safe extraction of user id for the token payload
        const userId = (user as any)._id ?? (user as any).id;
        if (!userId) {
            // extremely unlikely, but handle defensively
            throw new Error('User record missing identifier');
        }

        const payload = { sub: userId, email: (user as any).email };
        const token = await this.jwtService.signAsync(payload);

        return token;
    }
}
