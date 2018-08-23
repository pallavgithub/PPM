export class pp_Inventory {
    ID: number;
    PetrolPumpCode: string;
    ProductCategoryID: number;
    ProductID: number;
    LubricantIntialStockQuantity: number;
    LubricantIntialStockDate: string;
    LubricantStockQuantity: number;
    LubricantStockDate: string;
    FuelIntialReadingQuantity: number;
    FuelIntialReadingDate: string;
    FuelReadingQuantity: number;
    FuelReadingDate: string;
    FuelTankID: number;
    FuelReadingTypeID: number;
    FuelTankerTypeID: number;
    Description: string;
    CreatedBy: number;
    CreatedOn: string;
    ModifiedBy: number;
    ModifiedOn: string;
    IsEditModal: boolean;
    /**
     *
     */
    constructor() {
        this.ID = 0;
        this.PetrolPumpCode = '';
        this.ProductCategoryID = 0;
        this.ProductID = 0;
        this.LubricantIntialStockQuantity = 0;
        this.LubricantIntialStockDate = null;
        this.LubricantStockQuantity = 0;
        this.LubricantStockDate = null;
        this.FuelIntialReadingQuantity = 0;
        this.FuelIntialReadingDate = null;
        this.FuelReadingQuantity = 0;
        this.FuelReadingDate = null;
        this.FuelTankID = 0;
        this.FuelReadingTypeID = 0;
        this.FuelTankerTypeID = 0;
        this.Description = '';
        this.CreatedBy = 0;
        this.CreatedOn = null;
        this.ModifiedBy = 0;
        this.ModifiedOn = null;
        this.IsEditModal = false;
    }
}
