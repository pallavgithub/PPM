import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class LoadingUIService {

    private showloading = new BehaviorSubject<boolean>(false);

    showloading$ = this.showloading.asObservable();
    // service command
    showLoader() {
        this.showloading.next(true);
    }
    hideLoader() {
        this.showloading.next(false);
    }
}