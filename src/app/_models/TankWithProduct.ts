import { pp_PumpProduct } from "./pp_PumpProduct";
import { pp_Tank } from "./pp_Tank";

export class TankWithProduct {
    pumpProduct:pp_PumpProduct;
    tank:pp_Tank[];
    dateOfEntry:string;
    tankerID:number;
    constructor() {
        this.pumpProduct=null;
        this.tank=null;
        this.dateOfEntry = '';
        this.tankerID = 0;
    }
}