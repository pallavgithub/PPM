export class UserDetail {
    RoleID: number;
    FullName: string;
    PetrolPumpName: string;
    LicenseStartDate: string;
    LicenseEndDate: string;

    constructor() {
        this.RoleID = 0;
        this.FullName = null;
        this.PetrolPumpName = null;
        this.LicenseStartDate = null;
        this.LicenseEndDate = null;
    }
}