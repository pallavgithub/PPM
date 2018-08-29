import { PetrolPumpService } from './_services/petrolpump.service';
import { NozzleComponent } from './nozzle/nozzle.component';
import { PumpTankComponent } from './pump-tank/pump-tank.component';
import { PumpNozzleComponent } from './pump-nozzle/pump-nozzle.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {StateMainService} from './_services/statemain.service'

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

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
import {LandingDashboardComponent} from './landingDashboard/landingDashboard.component';
import { PumpAdditionalInfoComponent } from './pump-Additionalinfo/pump-Additionalinfo.component';
import { PriceAdjustmentComponent } from './priceAdjustment/priceAdjustment.component';
import { PumpUsersComponent } from './pump-users/pump-users.component';
import { CreditorComponent } from './creditor/creditor.component';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatTabsModule, MatDialogModule, MatTabChangeEvent, MatSidenavModule,MatButtonModule, MatNativeDateModule, MatIconModule, MatToolbarModule,MatCheckboxModule } from '@angular/material';
import { MatSidenavMenuModule } from 'mat-sidenav-menu';
import {MatListModule} from '@angular/material/list'
import { PumpDetailsComponent } from './pump-details/pump-details.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PaymentComponent } from './payment/payment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDialogFormComponent } from './productDialog/productDialog.component';
import { PaymentDialogFormComponent } from './paymentDialog/paymentDialog.component';
import { InventoryDialogFormComponent } from './inventoryDialog/inventoryDialog.component'
import { DatePipe } from '@angular/common';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { ReadingTypeDialogFormComponent } from './readingTypeDialog/readingTypeDialog.component'
import { TestPage1Component, TestPage2Component, TestPage3Component, TestPageComponent } from './test-pages/test-pages.component';
import { MenuStateComponent } from './test-pages/manu-state.component';
import { CreditorformComponent } from './creditorform/creditorform.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTabsModule,
        MatDialogModule,
        MatSidenavModule,
        MatListModule,
        routing,
        MatSidenavModule,MatButtonModule, MatNativeDateModule, MatIconModule, MatToolbarModule,MatCheckboxModule,
        MatSidenavMenuModule,
        BrowserAnimationsModule, ToasterModule.forRoot(), NgbModule.forRoot()
        //HttpService
    ],
    entryComponents: [PumpUsersComponent, UserformComponent, PumpTankComponent, TankformComponent, NozzleformComponent, ChangePasswordComponent, ProductDialogFormComponent, PumpNozzleComponent, PaymentDialogFormComponent, InventoryDialogFormComponent, ReadingTypeDialogFormComponent,CreditorformComponent],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PumpRegisterComponent,
        PumpUserMapComponent,
        CreditorComponent,
        CreditorformComponent,
        PumpInfoComponent,
        LandingDashboardComponent,
        PumpAdditionalInfoComponent,
        PriceAdjustmentComponent,
        PetrolPumpFormComponent,
        PumpTankComponent,
        PumpNozzleComponent,
        NozzleComponent,
        UserformComponent,
        CreditorformComponent,
        PumpUsersComponent,
        ChangePasswordComponent,
        ProductComponent,
        ProductDialogFormComponent,
        InventoryDialogFormComponent,
        PaymentComponent,
        PaymentDialogFormComponent,
        DashBoardComponent,
        InventoryComponent,
        ReadingTypeDialogFormComponent,
        TestPage1Component, TestPage2Component, TestPage3Component, TestPageComponent, MenuStateComponent,
        TankformComponent, NozzleformComponent, ResultComponent, MasterComponent, HeaderComponent, PumpDetailsComponent, FooterComponent, HeaderLoginComponent],
    providers: [
        // HttpService,111
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        StateMainService,
        //{provide: ErrorHandler,useClass: GlobalErrorHandler},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: WorkflowService, useClass: WorkflowService },
        WorkflowGuard, FormDataService, PetrolPumpService,
        // provider used to create fake backend
        fakeBackendProvider, DatePipe
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }