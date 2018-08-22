import { Component } from "@angular/core";
import { ToasterConfig} from 'angular2-toaster';
@Component({
  selector: "app",
  templateUrl: "app.component.html"
})
export class AppComponent {  
  public config: ToasterConfig = 
    new ToasterConfig({positionClass: 'toast-top-center',tapToDismiss: true},
  );
  constructor() {}
  isLoggedIn() {
    if (localStorage.getItem("currentUser")) return true;
    else return false;
  }
}
