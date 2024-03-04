import { Module,forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/jwtStrategy';
import { LocalStrategy } from './strategy/localStrategy';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({secret: 'MY_JWT_SECRET',signOptions: { expiresIn: '3000s' },}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JwtStrategy,UsersService],
  exports:[AuthService, JwtModule,]
})
export class AuthModule {}
