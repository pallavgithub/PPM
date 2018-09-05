export class CreditorInventory {
    ID: number;
    PetrolPumpCode: string;
    ProductID: number;
    Unit: number;
    CreditorID: number;
    PurchaseQuantity: number;
    DateMeasured: string;
    Description: string;
    CreatedBy: number;
    CreatedOn: string;
    ModifiedBy: number;
    ModifiedOn: string;
    ProductName: string;
    UnitName: string;
    SMSCode: string;
    IsEditModal:boolean;
    IsApproved:boolean;
    UserId:string;
    PurchasePrice:number;
    TotalPrice:number;
    constructor() {
        this.ID = 0;
        this.PetrolPumpCode = '';
        this.ProductID = 0;
        this.Unit = 0;
        this.CreditorID = 0;
        this.PurchaseQuantity = 0;
        this.PurchasePrice = 0;
        this.TotalPrice = 0;
        this.DateMeasured = '';
        this.Description = '';
        this.CreatedBy = 0;
        this.CreatedOn = '';
        this.ModifiedBy = 0;
        this.ModifiedOn = '';
        this.ProductName = '';
        this.UnitName = '';
        this.SMSCode = '';
        this.IsEditModal = false;
        this.IsApproved = false;
        this.UserId = '';
    }
}