import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { transform as transformBelt } from '../../belts/transformers/response.interceptor';
import { Prisma } from '@prisma/client';

type Ninja = Prisma.NinjaGetPayload<{ include: { belts: true } }>;

export interface Response {
  data: any;
}

/**
 * Transform the ninja object to a format suitable for the frontend
 * @param ninja
 */
export const transform = (ninja: Ninja) => ({
  ninja_name: ninja.name,
  ninja_id: ninja.id,
  belts: ninja.belts.map(transformBelt),
});

@Injectable()
export class NinjaResourceInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((ninja: Ninja) => ({
        data: transform(ninja),
      })),
    );
  }
}

@Injectable()
export class NinjaCollectionInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((ninjas: Array<Ninja>) => ({
        data: ninjas.map(transform),
      })),
    );
  }
}
