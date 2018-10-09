export class PaymentLedger {
    PaymentTypeID: number;
    PaymentTypeName:string;
    PetrolPumpCode: string;
    Amount: number;
    Description: string;
    Date: string;
    IsCredit: boolean;
    constructor() {
        this.PaymentTypeID = 0;
        this.PaymentTypeName = "";
        this.PetrolPumpCode = '';
        this.Amount = 0;
        this.Date = null;
        this.Description = '';
        this.IsCredit = false;
    }
}