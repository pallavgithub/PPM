export class PetrolPumpRegister {
    PetrolPumpName:string;
    OwnerName:string;
    Logo:ByteString;
    Address:string;
    PetrolPumpPincode:number;
    Mobile:number;
    Email:string;
    TIN:string;
    CST:string;
    LicenseStartDate:string;
    LicenseEndDate:string;
    UserID:string;
    Password:string;
    ConfirmPassword:string;
    /**
     *
     */
    constructor() {
        this.PetrolPumpName=null;
        this.OwnerName=null;
        this.Logo=null;
        this.Address=null;
        this.PetrolPumpPincode=null;
        this.Email=null;
        this.TIN=null;
        this.CST=null;
        this.LicenseStartDate=null;
        this.LicenseEndDate=null;
        this.UserID=null;
        this.Password=null;
        this.ConfirmPassword = null;
    }
}