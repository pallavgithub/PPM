import { ErrorHandler, Injectable} from '@angular/core';
import { ToasterService } from 'angular2-toaster';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private toasterService:ToasterService) { }
  handleError(error) {
     this.toasterService.pop('error',error.statusText,error.message);
     // IMPORTANT: Rethrow the error otherwise it gets swallowed
     throw error;
  }
  
}