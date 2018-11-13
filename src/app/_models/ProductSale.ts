export class ProductSale {
    ProductID:number;
    Unit:string;
    ProductName:string;
    ProductCategoryID:number;
    SaledFuelVolume:number;
    TotalPrice:number;
    constructor() {
        this.ProductID=0;
        this.Unit='';
        this.ProductName='';
        this.ProductCategoryID=0;
        this.SaledFuelVolume=0;
        this.TotalPrice=0;
    }
}