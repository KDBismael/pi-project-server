import { Module,forwardRef } from '@nestjs/common';
import { PassportModule } from ‘@nestjs/passport’;
import { JwtModule } from ‘@nestjs/jwt’;
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/jwtStrategy';
import { LocalStrategy } from './strategy/localStrategy';

@Module({
  import:[
    forwardRef(() => UsersModule),
    JwtModule.register({secret: 'MY_JWT_SECRET',signOptions: { expiresIn: '3000s' },}),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
