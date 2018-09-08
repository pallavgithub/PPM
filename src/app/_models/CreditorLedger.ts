export class CreditorLedger {
    ID: number;
    PetrolPumpCode: string;
    Amount: number;
    Balance: number;
    Description: string;
    Date: string;
    IsCredit: boolean;
    constructor() {
        this.ID = 0;
        this.PetrolPumpCode = '';
        this.Amount = 0;
        this.Balance=0;
        this.Date = null;
        this.Description = '';
        this.IsCredit = false;
    }
}