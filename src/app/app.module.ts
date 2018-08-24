import { PetrolPumpService } from './_services/petrolpump.service';
import { NozzleComponent } from './nozzle/nozzle.component';
import { PumpTankComponent } from './pump-tank/pump-tank.component';
import { PumpNozzleComponent } from './pump-nozzle/pump-nozzle.component';
import { NgModule, ErrorHandler }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';;
import { PumpRegisterComponent } from './pump-register/pump-register.component';;
import { PumpUserMapComponent } from './pump-user-map/pump-user-map.component';
import { PumpInfoComponent } from './pump-info/pump-info.component';
import { PumpAdditionalInfoComponent } from './pump-Additionalinfo/pump-Additionalinfo.component';
import { PumpUsersComponent } from './pump-users/pump-users.component';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PetrolPumpFormComponent } from './petrol-pump-form/petrol-pump-form.component';
import { WorkflowService } from './workflow/workflow.service';
import { WorkflowGuard } from './workflow/workflow-guard.service';
import { FormDataService } from './_services/pumpRegister.service';
import { UserformComponent } from './userform/userform.component';
import { ChangePasswordComponent } from './ChangePassword/ChangePassword.Component';
import { TankformComponent } from './tankform/tankform.component';
import { NozzleformComponent } from './nozzleform/nozzleform.component';
import { ResultComponent } from './result/result.component';
import { MasterComponent } from './master/master.component';
import { HeaderComponent } from './header/header.component';// import { HttpService } from 'src/app/_services/http.service';
import { FooterComponent } from './footer/footer.component';// import { HttpService } from 'src/app/_services/http.service';
import { GlobalErrorHandler } from './_helpers/GlobalErrorHandler';
import { ToasterModule } from 'angular2-toaster';
import { MatTabsModule,MatDialogModule,MatTabChangeEvent   } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PumpDetailsComponent } from './pump-details/pump-details.component';
import {DashBoardComponent} from './dashboard/dashboard.component';
import {ProductComponent} from './product/product.component';
import {InventoryComponent} from './inventory/inventory.component';
import {PaymentComponent} from './payment/payment.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDialogFormComponent} from './productDialog/productDialog.component';
import {PaymentDialogFormComponent} from './paymentDialog/paymentDialog.component';
import {InventoryDialogFormComponent} from './inventoryDialog/inventoryDialog.component'
import { DatePipe } from '@angular/common';
import { HeaderLoginComponent } from './header-login/header-login.component';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTabsModule,
        MatDialogModule,
        MatSidenavModule, 
        routing,
        BrowserAnimationsModule,ToasterModule.forRoot(),NgbModule.forRoot()
        //HttpService
    ],
    entryComponents: [PumpUsersComponent,UserformComponent,PumpTankComponent,TankformComponent,NozzleformComponent,ChangePasswordComponent,ProductDialogFormComponent,PumpNozzleComponent,PaymentDialogFormComponent,InventoryDialogFormComponent],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PumpRegisterComponent,
        PumpUserMapComponent,
        PumpInfoComponent ,
        PumpAdditionalInfoComponent,
        PetrolPumpFormComponent,
        PumpTankComponent,
        PumpNozzleComponent,
        NozzleComponent,
        UserformComponent,
        PumpUsersComponent,
        ChangePasswordComponent,
        ProductComponent,
        ProductDialogFormComponent,
        InventoryDialogFormComponent,
        PaymentComponent,
        PaymentDialogFormComponent,
        DashBoardComponent,
        InventoryComponent,
        TankformComponent,NozzleformComponent,ResultComponent,MasterComponent,HeaderComponent,PumpDetailsComponent,FooterComponent,HeaderLoginComponent], 
    providers: [
       // HttpService,111
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        //{provide: ErrorHandler,useClass: GlobalErrorHandler},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: WorkflowService, useClass: WorkflowService },
        WorkflowGuard,FormDataService,PetrolPumpService,
        // provider used to create fake backend
        fakeBackendProvider,DatePipe
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }