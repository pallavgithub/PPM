export class NozzleDailyBreakUp {
    PetrolPumpCode:string;
    DailyNozzleReadingID:number;
    NozzleID:number;
    PaymentTypeID:number;    
    Amount:number;
    DateEntered:string;
    Description:string;
    constructor() {
        this.PetrolPumpCode=null;
        this.DailyNozzleReadingID=0;
        this.NozzleID=0;
        this.PaymentTypeID=0;
        this.Amount = 0;
        this.DateEntered=null;
        this.Description=null;
    }
}