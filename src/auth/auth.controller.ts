import { Controller,Post,Request,ConflictException,UseGuards } from '@nestjs/common';
import { AuthGuard } from ‘@nestjs/passport’;
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ){}

    @Post('signup')
    async create(@Request() req): Promise<any> {
        const newUser = req.body;
        try {
            const query = { email: newUser.email };
            const isUser = await this.userService.findOne(query);
            if (isUser) throw new ConflictException('User Already Exist');
            const user = await this.userService.create(newUser);
            return user;
        } catch (err) {
            console.error('Something went wrong in signup:', err);
            throw err;
        }
    }

    @Post('signin')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req): Promise<any> {
        try {
            return await this.authService.generateJwtToken(req.user);
        } catch (error) {
            throw error;
        }
    }


}
