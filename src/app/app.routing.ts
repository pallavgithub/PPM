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

const appRoutes: Routes = [
    { path: '', component: HomeComponent,canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'adduser', component: UserformComponent,canActivate: [AuthGuard] },
    { path: 'pumpRegister', component: PumpRegisterComponent,canActivate: [AuthGuard] },
    // { path: 'DeleteUser', component: PumpUsersComponent,canActivate: [AuthGuard] },
    { path: 'pumpDetails', component: PumpDetailsComponent,canActivate: [AuthGuard],runGuardsAndResolvers: 'always' },
    { path: 'pumpDetails/:pumpcode', component: PumpDetailsComponent,canActivate: [AuthGuard] },
    { path: 'pumpInfo', component: PumpInfoComponent,canActivate: [AuthGuard] },
    // { path: 'pumpUsers', component: PumpUsersComponent,canActivate: [AuthGuard,WorkflowGuard] },
    // { path: 'pumpTanks', component: PumpTankComponent,canActivate: [AuthGuard,WorkflowGuard] },    
    // //{ path: 'nozzles', component: NozzleComponent,canActivate: [AuthGuard,WorkflowGuard] },
    // { path: 'result',  component: ResultComponent,canActivate: [AuthGuard,WorkflowGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'});