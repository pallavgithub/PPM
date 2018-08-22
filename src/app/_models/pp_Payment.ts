export class pp_Payment {
    ID: number;
    PetrolPumpCode: string;
    PaymentTypeCode: string;
    PaymentTypeID: number;
    BankName: string;
    BankCode: string;
    ChequeNumber: string;
    DraftNumber: string;
    WalletNumber: string;
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
        this.PaymentTypeCode = '';
        this.PaymentTypeID = 0;
        this.BankName = '';
        this.BankCode = '';
        this.ChequeNumber = '';
        this.DraftNumber = '';
        this.CreatedBy = 0;
        this.CreatedOn = '';
        this.ModifiedBy = 0;
        this.ModifiedOn = '';
        this.IsEditModal = false;
        this.WalletNumber = '';
    }
}
