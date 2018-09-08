export class FuelInventory {
    ID:number;
    PetrolPumpCode:string;
    ProductCategoryID:number;
    ProductCode:string;
    ProductID:number;
    PurchaseQuantity:number;
    DateMeasured:string;
    PurchasePrice:number;
    Name:string;
    constructor() {
        this.ID=0;        
        this.PetrolPumpCode='';
        this.ProductCategoryID=0;
        this.ProductCode='';
        this.ProductID=0;
        this.PurchaseQuantity=0;
        this.DateMeasured=null;
        this.PurchasePrice=0;
        this.Name='';
    }
}

