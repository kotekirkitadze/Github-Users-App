import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("hi hi")
    const TOKEN = "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";
    let jsonReq: HttpRequest<any> = req.clone({
      headers: req.headers.set("Authorization",
        "Bearer " + TOKEN)
    })
    return next.handle(jsonReq);
  }
}



// setHeaders: {
//   "Accept": "application/vnd.github.v3+json",
//     "Authorization": "token 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",
//       "Content-type": "Content-Type: application/json; charset=utf-8",
//       }
