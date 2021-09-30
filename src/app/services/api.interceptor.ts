import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor
  implements HttpInterceptor
{
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const TOKEN =
      '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';
    let jsonReq: HttpRequest<any> = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + TOKEN
      ),
    });
    return next.handle(jsonReq);
  }
}
