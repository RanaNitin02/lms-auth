import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerDto: RegisterUserDto){

        try {
            return await this.userModel.create({
                fname: registerDto.fname,
                lname: registerDto.lname,
                email: registerDto.email,
                password: registerDto.password, 
            });
        } catch (error: unknown) {
            // console.log(error);
            
            const err = error as { code?: number };

            const DUPLICATE_KEY_CODE = 11000;

            if(err.code === DUPLICATE_KEY_CODE){
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }
}
