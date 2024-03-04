import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Patient } from 'src/schema/patient.schema';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private AuthService:AuthService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

    async findOne(query: any): Promise<any> {
        return await this.userModel.findOne(query).select('+password');
    }

    async create(user: any): Promise<any> {   
        const hashedPassword = await this.AuthService.getHashedPassword(user.password);
        user.password = hashedPassword;
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(query: any, payload: any): Promise<User> {
        return this.userModel.findOneAndUpdate(query, payload, {
            new: true,
            upsert: true,
        });
    }
    
    async findOneAndRemove(query: any): Promise<any> {
        return this.userModel.findByIdAndDelete(query);
    }    
}
