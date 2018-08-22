import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { debug } from 'util';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private toasterService:ToasterService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && err.error==null) {
                this.toasterService.pop('error','','Session Expired.');
                this.authenticationService.logout();
                location.reload(true);
            }
            else if(err.status === 403 && err.error==null){
                this.toasterService.pop('error','','You are not authroized.');   
            }
            else if(err.status === 500 && err.error==null){
                this.toasterService.pop('error','','Internal Server Error.');  
            }
            else if(err.error)
            {
                this.toasterService.pop('error','',err.error.Message)
            }
            else 
            {
             this.toasterService.pop('error','','Something went wrong. Please try again later.');
            }
            return throwError(err);
        }))
    }
}