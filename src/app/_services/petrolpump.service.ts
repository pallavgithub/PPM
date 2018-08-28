import { pp_User } from '../_models/pp_User';
import { pp_PetrolPump } from '../_models/pp_PetrolPump';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { PetrolPumpRegister } from "../_models/PetrolPumpRegister";
import { pp_Tank } from '../_models/pp_Tank';
import { pp_Nozzle } from '../_models/pp_Nozzle';
import { State } from '../_models/State';
import { pp_Payment } from '../_models/pp_Payment';
import { PumpStatus } from '../_models/PumpStatus';
import { UserDetail } from '../_models/userDetail';

@Injectable()
export class PetrolPumpService {
    constructor(private http: HttpClient) {

    }
    
    register(petrolPumpRegister: PetrolPumpRegister) {
        return this.http.post(`${environment.apiUrl}/Pump/RegisterPump`, JSON.stringify(petrolPumpRegister));
    }

    petrolPumpList() {
        return this.http.get<object[]>(`${environment.apiUrl}/Pump/PetrolPumpList`);
    }

    getPumpDetails(){
        return this.http.get(`${environment.apiUrl}/Pump/PetrolPumpList`);
    }

    getPetrolPumpInfo(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpInfo?petrolPumpCode=`+petrolPumpCode);
    }
    getPetrolPumpDashboard(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpDashboard?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }

    getPumpStatus(petrolPumpCode:string){
        return this.http.get<PumpStatus>(`${environment.apiUrl}/Pump/CheckFormCompletenes?petrolPumpCode=`+petrolPumpCode,);
    }
    getUserDetail(){
        return this.http.get<UserDetail>(`${environment.apiUrl}/Pump/UserInfo`);
    }
    updatePetrolPumpInfo(pumpInfo:pp_PetrolPump){
        return this.http.post(`${environment.apiUrl}/Pump/UpdatePetrolPumpInfo`,JSON.stringify(pumpInfo));
    }
    addUpdatePumpUser(pumpUser:pp_User){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateUserInfo`,JSON.stringify(pumpUser))
    }
    addUpdatePumpTank(pumpTank:pp_Tank){
        return this.http.post(`${environment.apiUrl}/Pump/AddUpdateTank`,JSON.stringify(pumpTank))
    }
    ChangeUserPassword(pumpUser:pp_User){
        return this.http.post(`${environment.apiUrl}/Pump/ChangeUserPassword`,JSON.stringify(pumpUser))
    }
    updatePetrolPumpAdditionalInfo(pumpInfo:pp_PetrolPump){
        return this.http.post(`${environment.apiUrl}/Pump/UpdatePetrolPumpInfo`,JSON.stringify(pumpInfo));
    }

    addUpdatePumpProduct(pumpProduct:pp_PumpProduct){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateProductInfo`,JSON.stringify(pumpProduct))
    }
    addUpdatePumpPayment(pumpPayment:pp_Payment){
        return this.http.post(`${environment.apiUrl}/Pump/UpdatePaymentInfo`,JSON.stringify(pumpPayment))
    }
    addUpdatePumpNozzle(pumpNozzle:pp_Nozzle){
        return this.http.post(`${environment.apiUrl}/Pump/AddUpdateNozzle`,JSON.stringify(pumpNozzle))
    }
    getAllStates(){
        return this.http.get<State[]>(`${environment.apiUrl}/Pump/State`);
    }
}