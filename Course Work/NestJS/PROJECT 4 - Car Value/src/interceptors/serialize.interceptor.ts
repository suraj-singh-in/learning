import {
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run somwthing before a request is handled by request handler

    return handler.handle().pipe(
      map((data: any) => {
        // Run Before the response is sent out
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
