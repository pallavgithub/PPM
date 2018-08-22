import { pp_Nozzle } from './pp_Nozzle';
import { pp_Tank } from './pp_Tank';
import { pp_User } from './pp_User';
import { PetrolPumpRegister } from "./PetrolPumpRegister";
import { pp_PetrolPump } from "./pp_PetrolPump";
import { PetrolPumpUserMap } from './PetrolPumpUserMap';

export class pumpDataModel{
    petrolPumpRegister:PetrolPumpRegister;
    petrolPumpUserMap:PetrolPumpUserMap;
    pp_PetrolPump:pp_PetrolPump;
    pp_User:pp_User[];
    pp_Tank:pp_Tank[];
    /**
     *
     */
    constructor() {
        this.petrolPumpRegister=new PetrolPumpRegister();
        this.petrolPumpUserMap=new PetrolPumpUserMap();
        this.pp_PetrolPump=new pp_PetrolPump();
        this.pp_User=new Array<pp_User>();
        this.pp_Tank=new Array<pp_Tank>();
    }
}