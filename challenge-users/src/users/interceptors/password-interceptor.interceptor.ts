import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PasswordInterceptorInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> { 
   return next.handle().pipe(
      map((user) => {
          delete user.password;
        return user;
      }),
    );

  }
}
