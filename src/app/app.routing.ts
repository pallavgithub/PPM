import { HomeComponent } from './home/home.component';
import { NozzleComponent } from './nozzle/nozzle.component';
import { PumpRegisterComponent } from './pump-register/pump-register.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { PetrolPumpFormComponent } from './petrol-pump-form/petrol-pump-form.component'
import { WorkflowGuard } from './workflow/workflow-guard.service';
import { PumpInfoComponent } from './pump-info/pump-info.component';
import { PumpUsersComponent } from './pump-users/pump-users.component';
import { PumpTankComponent } from './pump-tank/pump-tank.component';
import { UserformComponent } from './userform/userform.component';
import { ChangePasswordComponent } from './ChangePassword/ChangePassword.Component';
import { ResultComponent } from './result/result.component';
import { PumpDetailsComponent } from './pump-details/pump-details.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { LandingDashboardComponent } from './landingDashboard/landingDashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CreditorComponent } from './creditor/creditor.component';
import { PriceAdjustmentComponent } from './priceAdjustment/priceAdjustment.component';
import { CreditorFuelRequestComponent } from './creditorFuelRequest/creditorFuelRequest.component';
import { CreditorFuelRequestReceivedComponent } from './creditorFuelRequestReceived/creditorFuelRequestReceived.component';
import { CreditorLedgerComponent } from './creditorLedger/creditorLedger.component';
import { DailyTankReadingComponent } from './dailyTankReading/dailyTankReading.component';
import { DailyNozzleReadingComponent } from './dailyNozzleReading/dailyNozzleReading.component';
import { MasterComponent } from './master/master.component';
import { PublicComponent } from './MasterLayout/Public.component';
import { PUBLIC_ROUTES } from './public/public.routes';

import { SecureComponent } from './MasterLayout/Secure.component';
import { SECURE_ROUTES } from './public/secure.routes';

// const appRoutes: Routes = [
//   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   // { path: 'adduser', component: UserformComponent,canActivate: [AuthGuard] },
//   { path: 'pumpRegister', component: PumpRegisterComponent, canActivate: [AuthGuard] },
//   { path: 'Landing/:pumpCode', component: LandingDashboardComponent, canActivate: [AuthGuard] },
//   { path: 'Inventory/:pumpCode', component: InventoryComponent, canActivate: [AuthGuard] },
//   { path: 'Creditor/:pumpCode', component: CreditorComponent, canActivate: [AuthGuard] },
//   { path: 'DailyPrice/:pumpCode', component: PriceAdjustmentComponent, canActivate: [AuthGuard] },
//   { path: 'FuelRequest/:pumpCode', component: CreditorFuelRequestComponent, canActivate: [AuthGuard] },
//   { path: 'FuelRequestReceived/:pumpCode', component: CreditorFuelRequestReceivedComponent, canActivate: [AuthGuard] },
//   { path: 'CreditorLedger/:pumpCode', component: CreditorLedgerComponent, canActivate: [AuthGuard] },
//   { path: 'DailyTankReading/:pumpCode', component: DailyTankReadingComponent, canActivate: [AuthGuard] },
//   { path: 'DailyNozzleReading/:pumpCode', component: DailyNozzleReadingComponent, canActivate: [AuthGuard] },
//   // { path: 'DeleteUser', component: PumpUsersComponent,canActivate: [AuthGuard] },
//   { path: 'pumpDetails', component: PumpDetailsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
//   { path: 'pumpDetails/:pumpcode', component: PumpDetailsComponent, canActivate: [AuthGuard] },
//   { path: 'pumpInfo', component: PumpInfoComponent, canActivate: [AuthGuard] },
//   { path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
//   { path: 'dashboard/:pumpcode', component: DashBoardComponent, canActivate: [AuthGuard] },
//   // { path: 'pumpUsers', component: PumpUsersComponent,canActivate: [AuthGuard,WorkflowGuard] },
//   // { path: 'pumpTanks', component: PumpTankComponent,canActivate: [AuthGuard,WorkflowGuard] },    
//   // //{ path: 'nozzles', component: NozzleComponent,canActivate: [AuthGuard,WorkflowGuard] },
//   // { path: 'result',  component: ResultComponent,canActivate: [AuthGuard,WorkflowGuard] },
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];

// export const routing = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' });


const appRoutes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: '', component: HomeComponent,canActivate: [AuthGuard] },
  { path: '', component: PublicComponent, canActivate: [AuthGuard], data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES }
  // { path: '**', redirectTo: 'login' }
  // { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'});