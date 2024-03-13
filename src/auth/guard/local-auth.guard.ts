import { Injectable, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    const User=context.args[0].body.user
    if (err || !User) {
      throw new HttpException(err.message, err.status);
    }
    return User;
  }
}