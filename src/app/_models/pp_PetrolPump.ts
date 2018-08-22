export class pp_PetrolPump {
    PetrolPumpCode:string;
    PetrolPumpName:string;
    OwnerName:string;
    Logo:ByteString;
    Address:string;
    Address2:string;
    City:string;
    State:number;
    Country:string;
    PetrolPumpPincode:number;
    Mobile:number;
    Email:string;
    TIN:string;
    CST:string;
    LicenseStartDate:string;
    LicenseEndDate:string;
    CreatedBy:number;
    CreatedOn:Date;
    ModifiedBy:number;
    ModifiedOn:Date;
   
    constructor() {
        this.PetrolPumpCode=null;
        this.PetrolPumpName=null;
        this.OwnerName=null;
        this.Logo=null;
        this.Address=null;
        this.Address2=null;
        this.City=null;
        this.State=0;
        this.PetrolPumpPincode=null;
        this.Mobile=null;
        this.Email=null;
        this.TIN=null;
        this.CST=null;
        this.LicenseStartDate=null;
        this.LicenseEndDate=null;     
        this.Country = null;   
    }
}