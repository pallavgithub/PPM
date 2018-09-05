export class CreditorLedger {
    ID: number;
    PetrolPumpCode: string;
    Amount: number;
    Description: string;
    Date: string;
    IsCredit: boolean;
    constructor() {
        this.ID = 0;
        this.PetrolPumpCode = '';
        this.Amount = 0;
        this.Date = null;
        this.Description = '';
        this.IsCredit = false;
    }
}