import { Role } from '../_models/Role';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { pp_User } from '../_models/pp_User';
import { ReadingType } from '../_models/ReadingType';
import { HttpService } from './http.service';
import { FuelType } from '../_models/FuelType';
import { Tank } from '../_models/Tank';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { AllProduct } from '../AllProduct';
import { pp_Tank } from '../_models/pp_Tank';
import { pp_Nozzle } from '../_models/pp_Nozzle';
import { UserIdName } from '../_models/UserIdName';
import { UserInfo } from '../_models/UserInfo';
import { State } from '../_models/State';
import { ProductWithCategory } from '../_models/ProductWithCategory';
import { Unit } from '../_models/Unit';
import { PaymentType } from '../_models/PaymentType';
import { pp_Payment } from '../_models/pp_Payment';
import { UserDetail } from '../_models/userDetail';
import { ReadingTypeDetail } from '../_models/readingTypeDetail';
import { ChartType } from '../_models/ChartType';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {       
     }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }

    getAllRole(){
        return this.http.get<Role[]>(`${environment.apiUrl}/Pump/Role`);
    }    
    getAllFuelType(){
        return this.http.get<FuelType[]>(`${environment.apiUrl}/Pump/FuelType`);
    }
    getAllChartType(){
        return this.http.get<ChartType[]>(`${environment.apiUrl}/Pump/ChartType`);
    }
    getReadingType(){
        return this.http.get<ReadingType[]>(`${environment.apiUrl}/Pump/GetReadingType`);
    }
    getFuelTypeByID(petrolPumpCode:string){
        return this.http.get<FuelType[]>(`${environment.apiUrl}/Pump/PumpProductsByID/?petrolPumpCode=`+petrolPumpCode);
    }
    getTankReadingByTankID(tankID:number,petrolPumpCode:string){
        return this.http.get<ReadingTypeDetail[]>(`${environment.apiUrl}/Pump/TankReadingInfo/?petrolPumpCode=`+petrolPumpCode +'&tankID=' + tankID);
    }
    submitPumpData(pumpData){
        return this.http.post(`${environment.apiUrl}/Pump/RegisterPump`,JSON.stringify(pumpData));
    }
    getUserInfo(){
        return this.http.get(`${environment.apiUrl}/Pump/UserInfo`);
    }
    
    getUserDetailInfo(){
        return this.http.get<UserInfo>(`${environment.apiUrl}/Pump/UserInfo`);
    }
    deleteUser(user: pp_User) {
        return this.http.post(`${environment.apiUrl}/Pump/DeleteUser`, JSON.stringify(user));
    }
    deleteTank(tank: pp_Tank) {
        return this.http.post(`${environment.apiUrl}/Pump/DeleteTank`, JSON.stringify(tank));
    }
    deleteTankReading(tank: ReadingTypeDetail) {
        return this.http.post(`${environment.apiUrl}/Pump/DeleteTankReading`, JSON.stringify(tank));
    }
    deleteNozzle(nozzle: pp_Nozzle) {
        return this.http.post(`${environment.apiUrl}/Pump/DeleteNozzle`, JSON.stringify(nozzle));
    }
    deleteProduct(product: pp_PumpProduct) {
        return this.http.post(`${environment.apiUrl}/Pump/DeleteProduct`, JSON.stringify(product));
    }
    deletePayment(payment: pp_Payment) {
        return this.http.post(`${environment.apiUrl}/Pump/DeletePayment`, JSON.stringify(payment));
    }
    getAllProducts(){
        return this.http.get<AllProduct[]>(`${environment.apiUrl}/Pump/AllPumpProducts`);
    }
    getAllProductsWithCategory(){
        return this.http.get<ProductWithCategory[]>(`${environment.apiUrl}/Pump/PumpProducts`);
    }
    getAllUnits(){
        return this.http.get<Unit[]>(`${environment.apiUrl}/Pump/Unit`);
    }
    getAllPaymentType(){
        return this.http.get<PaymentType[]>(`${environment.apiUrl}/Pump/PaymentType`);
    }
    getTanksByID(petrolPumpCode:string){
        return this.http.get<Tank[]>(`${environment.apiUrl}/Pump/GetTankByID/?petrolPumpCode=` + petrolPumpCode);
    }

    getTanksByIDAndFuelType(petrolPumpCode:string, fuelTypeID:number){
        return this.http.get<Tank[]>(`${environment.apiUrl}/Pump/GetTankByIDAndFuelType/?petrolPumpCode=` + petrolPumpCode + `&fuelTypeID=`+ fuelTypeID);
    }

    getUserListByID(petrolPumpCode:string){
        return this.http.get<UserIdName[]>(`${environment.apiUrl}/Pump/UserList/?petrolPumpCode=`+petrolPumpCode);
    }
    getAssignedToListByID(petrolPumpCode:string){
        return this.http.get<UserIdName[]>(`${environment.apiUrl}/Pump/AssignedToList/?petrolPumpCode=`+petrolPumpCode);
    }
    
}