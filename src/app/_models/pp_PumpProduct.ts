export class pp_PumpProduct {
  ID: number;
  PetrolPumpCode : string;
  ProductID: number;
  InitialQuantity: string;
  PurchaseQuantity: string;
  Unit: number;
  PurchaseRate: string;
  SaleRate: string;
  Description: string;
  CreatedBy: number;
  CreatedOn: string;
  ModifiedBy: number;
  ModifiedOn: string;
  IsEditModal : boolean;
  PurchaseDate : string;
  SaleDate : string;
  ProductCode : string;
  DateStockMeasuredOn:string;
  CategoryID:number;
  
  constructor() {
    this.ID=0;
    this.PetrolPumpCode = null;
    this.ProductID=0;
    this.InitialQuantity='';
    this.PurchaseQuantity='';
    this.Unit = 0;
    this.PurchaseRate='';
    this.SaleRate='';
    this.Description=null;
    this.CreatedBy=0;
    this.CreatedOn=null;
    this.ModifiedBy=0;
    this.ModifiedOn=null;
    this.IsEditModal = false;
    this.PurchaseDate = '';
    this.SaleDate = '';
    this.ProductCode = '';
    this.DateStockMeasuredOn = '';
    this.CategoryID = 0;
  }
}
