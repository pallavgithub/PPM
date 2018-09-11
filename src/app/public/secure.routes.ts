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

export const SECURE_ROUTES: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },    
    { path: 'pumpRegister', component: PumpRegisterComponent },
    { path: 'pumpDetails', component: PumpDetailsComponent, runGuardsAndResolvers: 'always' },
    { path: 'pumpDetails/:pumpcode', component: PumpDetailsComponent },
    { path: 'pumpInfo', component: PumpInfoComponent },
    { path: 'dashboard', component: DashBoardComponent, runGuardsAndResolvers: 'always' },
    { path: 'dashboard/:pumpcode', component: DashBoardComponent }
    //  otherwise redirect to home
    // { path: '**', redirectTo: '' }
];