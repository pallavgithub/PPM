import { HomeComponent } from '../home/home.component';
import { NozzleComponent } from '../nozzle/nozzle.component';
import { PumpRegisterComponent } from '../pump-register/pump-register.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login';
import { AuthGuard } from '../_guards';
import { PetrolPumpFormComponent } from '../petrol-pump-form/petrol-pump-form.component'
import { WorkflowGuard } from '../workflow/workflow-guard.service';
import { PumpInfoComponent } from '../pump-info/pump-info.component';
import { PumpUsersComponent } from '../pump-users/pump-users.component';
import { PumpTankComponent } from '../pump-tank/pump-tank.component';
import { UserformComponent } from '../userform/userform.component';
import { ChangePasswordComponent } from '../ChangePassword/ChangePassword.Component';
import { ResultComponent } from '../result/result.component';
import { PumpDetailsComponent } from '../pump-details/pump-details.component';
import { DashBoardComponent } from '../dashboard/dashboard.component';
import { LandingDashboardComponent } from '../landingDashboard/landingDashboard.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { CreditorComponent } from '../creditor/creditor.component';
import { PriceAdjustmentComponent } from '../priceAdjustment/priceAdjustment.component';
import { CreditorFuelRequestComponent } from '../creditorFuelRequest/creditorFuelRequest.component';
import { CreditorFuelRequestReceivedComponent } from '../creditorFuelRequestReceived/creditorFuelRequestReceived.component';
import { CreditorLedgerComponent } from '../creditorLedger/creditorLedger.component';
import { DailyTankReadingComponent } from '../dailyTankReading/dailyTankReading.component';
import { DailyNozzleReadingComponent } from '../dailyNozzleReading/dailyNozzleReading.component';
import { MasterComponent } from '../master/master.component';
import { UserProfileComponent } from '../userProfile/userProfile.component';
import { PaymentLedgerComponent } from '../paymentLedger/paymentLedger.component';


export const PUBLIC_ROUTES: Routes = [
    // { path: '', component: HomeComponent },
    // { path: 'login', component: LoginComponent },
    { path: 'Landing/:pumpCode', component: LandingDashboardComponent },
    { path: 'Inventory/:pumpCode', component: InventoryComponent },
    { path: 'Creditor/:pumpCode', component: CreditorComponent },
    { path: 'DailyPrice/:pumpCode', component: PriceAdjustmentComponent },
    { path: 'FuelRequest/:pumpCode', component: CreditorFuelRequestComponent },
    { path: 'FuelRequestReceived/:pumpCode', component: CreditorFuelRequestReceivedComponent },
    { path: 'CreditorLedger/:pumpCode', component: CreditorLedgerComponent },
    { path: 'PaymentLedger/:pumpCode', component: PaymentLedgerComponent },
    { path: 'DailyTankReading/:pumpCode', component: DailyTankReadingComponent },
    { path: 'DailyNozzleReading/:pumpCode', component: DailyNozzleReadingComponent },
    { path: 'Profile/:pumpCode', component: UserProfileComponent }
];