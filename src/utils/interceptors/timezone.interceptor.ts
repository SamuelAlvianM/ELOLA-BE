import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convert_to_jakarta_time } from 'src/utils/timezone/date.utils'; 

@Injectable()
export class Timezone_Interceptor implements NestInterceptor {
    intercept( context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => this.convert_dates(data)),
        );
    }

    private convert_dates(data: any): any {
        if(data instanceof Date) {
            return convert_to_jakarta_time(data);
        } else if(typeof data === 'object' && data !== null) {
            const result = {}
            for(const key in data) {
                result[key] = this.convert_dates(data[key]);
            }
            return result;
        }
        return data;
    }
}