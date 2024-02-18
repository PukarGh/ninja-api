import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prisma } from '@prisma/client';

type Belt = Prisma.BeltGetPayload<{ include: { ninja: true } }>;

export interface Response {
  data: any;
}

/**
 * Transform the belt object to a format suitable for the frontend
 * @param belt
 */
export const transform = (belt: Belt) => ({
  belt_level: belt.level,
  belt_id: belt.id,
});

@Injectable()
export class BeltResourceInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((belt: Belt) => ({
        data: transform(belt),
      })),
    );
  }
}

@Injectable()
export class NinjaCollectionInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((belts: Array<Belt>) => {
        return {
          data: belts.map((belt) => transform(belt)),
        };
      }),
    );
  }
}
