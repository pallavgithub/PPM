import { pp_PumpProduct } from "./pp_PumpProduct";

export class PumpProductWithDate {
    pp_PumpProduct : pp_PumpProduct[];
    DateStockMeasuredOn:string;    
    
    constructor() {   
      this.pp_PumpProduct=Array<pp_PumpProduct>();
      this.DateStockMeasuredOn = null;      
    }
  }
  