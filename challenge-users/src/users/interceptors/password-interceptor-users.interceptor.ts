import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from '../../entity/user.entity';

@Injectable()
export class PasswordInterceptorUsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((users: User[]) => {
        return users.map(user => {
          const { password, ...rest } = user;
          return rest;
        });
      }),
    );

  }
}
