import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.sto';
import { AuthGuard } from './auth.gaurd';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const createdUserToken = await this.authService.registerUser(registerUserDto);
        return { message: "registration token: ", token: createdUserToken };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        /*
            1. recieve email and pass
            2. match with db
            3. generate jwt token
        */

        const token = await this.authService.loginUser(loginDto.email, loginDto.password);
        return { message: "login token: ", token };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user?.sub;

        const user = await this.userService.getUserById(userId);

        const userObj = (user as any).toObject ? (user as any).toObject() : { ...user };
        delete userObj.password;
        console.log("protected user: ", user);


        return { user: userObj };
    }
}
