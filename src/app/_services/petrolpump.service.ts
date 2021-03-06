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
import { TankWithProduct } from '../_models/TankWithProduct';
import { CreditorInventory } from '../_models/CreditorInventory';
import { NozzleDailyBreakUp } from '../_models/NozzleDailyBreakUp';
import { IncompleteDailyData } from '../_models/IncompleteDailyData';
import { ProductSale } from '../_models/ProductSale';
import { PaymentLedger } from '../_models/PaymentLedger';

@Injectable()
export class PetrolPumpService {
    globalLoader: boolean = false;
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
    getPetrolPumpDashboardWithDate(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpDashboardWithDate?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpTankInfoWithDailyEntry(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpTankInfoWithDailyEntry?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }

    getPetrolPumpTankInfoOfLowLimit(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpTankInfoOfLowLimit?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpTankWithLowCapacity(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpTankWithLowCapacity?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }

    getPetrolPumpTankWithLowCapacity2(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpTankWithLowCapacity2?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    
    getPetrolPumpDailyFuelPriceChart(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpDailyFuelPriceChart?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpCreditorLedgerChart(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpCreditorLedgerChart?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    } 
    GetPetrolPumpNozzleSaleChart(petrolPumpCode:string,date:string,value:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpNozzleSaleChart?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date + '&value=' + value);
    }  
    getPetrolPumpNozzleSaleForStaffChart(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpNozzleSaleForStaffChart?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }  
    
    GetPetrolPumpNozzleFuelSaleChart(petrolPumpCode:string,date:string,value:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpNozzleFuelSaleChart?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date + '&value=' + value);
    }    
    getPetrolPumpLubesInfoOfLowLimit(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpLubesInfoOfLowLimit?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpTankLedger(petrolPumpCode:string,date:string,tankID:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpTankLedger?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date + '&tankID=' + tankID);
    }
    getPetrolPumpNozzleLedger(petrolPumpCode:string,date:string,nozzleID:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetPetrolPumpNozzleLedger?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date + '&nozzleID=' + nozzleID);
    }

    getPetrolPumpNozzleInfoWithDailyEntry(petrolPumpCode:string,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpNozzleInfoWithDailyEntry?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpNozzleInfoForBreakup(petrolPumpCode:string,nozzleID:number,date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetPetrolPumpNozzleInfoForBreakup?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&nozzleID=' + nozzleID + '&date=' + date);
    }
    getPetrolPumpPaymentTypeWithDailyBreakUp(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpPaymentTypeWithDailyBreakUp?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    getPetrolPumpDailyBreakUpInfo(petrolPumpCode:string, date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetPetrolPumpPaymentBreakUpInfo?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpPaymentTypeWithBreakUp(petrolPumpCode:string, date:string,nozzleID:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpPaymentTypeWithBreakUp?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date + '&nozzleID=' + nozzleID);
    }
    getPetrolPumpDailyBreakUp(petrolPumpCode:string, date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpDailyBreakUp?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }
    getPetrolPumpCreditorInventory(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpCreditorInventory?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    getPetrolPumpCreditorInventoryReceived(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpCreditorInventoryReceived?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    getPetrolPumpSpecificCreditorInventory(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpSpecificCreditorInventory?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    getPetrolPumpTodaySpecificCreditorInventory(petrolPumpCode:string,nozzleID:number,dateEntered:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpTodaySpecificCreditorInventory?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&nozzleID=' + nozzleID + '&dateEntered=' + dateEntered);
    }
    getPetrolPumpTodayDailyCreditorInventory(petrolPumpCode:string,dateEntered:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetPetrolPumpDailyCreditorInventory?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&dateEntered=' + dateEntered);
    }

    GetCreditorLedger(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetCreditorLedger?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    GetPaymentLedger(petrolPumpCode:string,paymentTypeID:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetPaymentLedger?petrolPumpCode=`+petrolPumpCode + '&paymentTypeID=' + paymentTypeID);
    }

    GetNozzleBreakUp(petrolPumpCode:string,nozzleID:string,date:string){
        return this.http.get<NozzleDailyBreakUp[]>(`${environment.apiUrl}/Pump/GetNozzleBreakUp?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&nozzleID=' + nozzleID + '&date=' + date);
    }
    GetPumpBreakUp(petrolPumpCode:string,date:string){
        return this.http.get<NozzleDailyBreakUp[]>(`${environment.apiUrl}/Pump/GetPumpBreakUp?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date);
    }

    GetPetrolPumpCreditorNetCreditLimit(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/CreditorNetCreditLimit?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    GetPetrolPumpCreditorNetCreditLimitWithPendingAndApproved(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpCreditorNetCreditLimitWithPendingAndApproved?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true);
    }
    GetPetrolPumpCreditorSpecificNetCreditLimit(petrolPumpCode:string,creditorID:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/CreditorSpecificNetCreditLimit?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&CreditorID=' + creditorID);
    }

    getPumpStatus(petrolPumpCode:string){
        return this.http.get<PumpStatus>(`${environment.apiUrl}/Pump/CheckFormCompletenes?petrolPumpCode=`+petrolPumpCode,);
    }
    getPumpIncompleteDailyData(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/RemainingDailyProductsTankAndNozzle?petrolPumpCode=`+petrolPumpCode,);
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

    AddCreditorFund(pumpUser:pp_User){
        return this.http.post(`${environment.apiUrl}/Pump/AddCreditorFund`,JSON.stringify(pumpUser))
    }

    AddUpdatePetrolPumpCreditorInventory(pumpUser:CreditorInventory, unitID:number){
        pumpUser.Unit = unitID;
        return this.http.post(`${environment.apiUrl}/Pump/UpdatePetrolPumpCreditorInventory`,JSON.stringify(pumpUser))
    }

    GetPetrolPumpCreditorPurchaseLimit(pumpUser:CreditorInventory){
        return this.http.post(`${environment.apiUrl}/Pump/CreditorPurchaseLimit`,JSON.stringify(pumpUser))
    }

    ApprovePetrolPumpCreditorsInventory(pumpUser:CreditorInventory,nozzzleID:number){
        return this.http.post(`${environment.apiUrl}/Pump/ApprovePetrolPumpCreditorsInventory?nozzzleID=`+nozzzleID,JSON.stringify(pumpUser))
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
    updatePetrolPumpPriceAdjustmentInfo(pumpInfo:pp_PumpProduct[]){
        return this.http.post(`${environment.apiUrl}/Pump/UpdatePriceAdjustmentInfo`,JSON.stringify(pumpInfo));
    }
    updateDailyTankReading(pumpInfo:pp_Tank[]){
        return this.http.post(`${environment.apiUrl}/Pump/updateDailyTankReading`,JSON.stringify(pumpInfo));
    }
    UpdateDailyNozzleReading(pumpInfo:pp_Nozzle[]){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateDailyNozzleReading`,JSON.stringify(pumpInfo));
    }
    UpdateDailyNozzleReadingBreakUp(pumpInfo:NozzleDailyBreakUp[]){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateDailyNozzleReadingBreakUp`,JSON.stringify(pumpInfo));
    }
    UpdateDailySingleNozzleReadingBreakUp(pumpInfo:NozzleDailyBreakUp){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateDailySingleNozzleReadingBreakUp`,JSON.stringify(pumpInfo));
    }
    updatePetrolPumpLubesPriceAdjustmentInfo(pumpProduct:pp_PumpProduct){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateLubesPriceAdjustmentInfo`,JSON.stringify(pumpProduct));
    }
    UpdatePetrolPumpLubesInventory(pumpProduct:pp_PumpProduct){
        return this.http.post(`${environment.apiUrl}/Pump/UpdatePetrolPumpLubesInventory`,JSON.stringify(pumpProduct));
    }

    addUpdatePumpProduct(pumpProduct:pp_PumpProduct){
        return this.http.post(`${environment.apiUrl}/Pump/UpdateProductInfo`,JSON.stringify(pumpProduct))
    }
    AddProductInventoryInfo(pumpProduct:pp_PumpProduct){
        return this.http.post(`${environment.apiUrl}/Pump/AddProductInventoryInfo`,JSON.stringify(pumpProduct))
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
    AddTankAndFuelInventory(tankWithProduct:TankWithProduct,petrolPumpCode : string){
        return this.http.post(`${environment.apiUrl}/Pump/AddTankAndFuelInventory?petrolPumpCode=`+ petrolPumpCode,JSON.stringify(tankWithProduct))
    }
    getPetrolPumpUserInfo(petrolPumpCode:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/PetrolPumpUserInfo?petrolPumpCode=`+petrolPumpCode);
    }
    GetLicenseStartDate(petrolPumpCode:string,isOld:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/LicenseStartDate?petrolPumpCode=`+petrolPumpCode + '&isOld=' + 1);
    }
    getAllProductSale(petrolPumpCode:string,dateFilterID:number,fromDate:string,toDate:string){
        return this.http.get<ProductSale[]>(`${environment.apiUrl}/Pump/GetAllProductSale?petrolPumpCode=`+petrolPumpCode + '&dateFilterID=' + dateFilterID+ '&fromDate=' + fromDate+ '&toDate=' + toDate);
    }    
    GetFuelSaleComparision(petrolPumpCode:string, date:string){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetFuelSaleComparision?petrolPumpCode=`+petrolPumpCode  + '&date=' + date);
    }
    GetFuelSaleComparisionDetails(petrolPumpCode:string,date:string,tankID:number){
        return this.http.get<any>(`${environment.apiUrl}/Pump/GetFuelSaleComparisionDetails?petrolPumpCode=`+petrolPumpCode + '&IsDashboard=' + true + '&date=' + date + '&tankID=' + tankID);
    }
    GetWorkingCapital(petrolPumpCode:string, isChartData:boolean){
        return this.http.get<any[]>(`${environment.apiUrl}/Pump/GetWorkingCapital?petrolPumpCode=`+petrolPumpCode+ '&isChartData='+ isChartData);
    } 
    GetFuelInventory(petrolPumpCode:string){
        return this.http.get<any[]>(`${environment.apiUrl}/Pump/GetFuelInventory?petrolPumpCode=`+petrolPumpCode);
    } 
    
    
}