import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
  data: any;
}

/**
 * Transform the ninja object to a format suitable for the frontend
 * @param ninja
 */
const transformNinja = (ninja) => {
  return {
    ninja_name: ninja.name,
    ninja_id: ninja.id,
  };
};

@Injectable()
export class NinjaResourceInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((ninja) => ({
        data: transformNinja(ninja),
      })),
    );
  }
}

@Injectable()
export class NinjaCollectionInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((ninjas) => {
        return {
          data: ninjas.map((ninja) => transformNinja(ninja)),
        };
      }),
    );
  }
}
