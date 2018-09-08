export class pp_User {
  ID: number;
  UserId: string;
  Password: string;
  ConfirmPassword: string;
  PetrolPumpCode: string;
  FullName: string;
  Email: string;
  RoleID: number;
  Phone: string;
  Address: string;
  CreditLimit: string;
  Consumed: string;
  Description: string;
  IsEditModal:boolean;
  RoleName:string;
  PaymentTypeID:number;
  PaymentTypeName:string;
  PaymentDate:string;
  IsEncashed:boolean;
  EncashementDate:string;
  AssignedNozzleID:number;
  
  constructor() {
    this.ID=0;
    this.UserId=null;
    this.Password=null;
    this.PetrolPumpCode=null;
    this.FullName=null;
    this.Email=null;
    this.RoleID=0;
    this.Phone=null;
    this.Address=null;
    this.CreditLimit='';
    this.Description=null;
    this.IsEditModal = false;
    this.ConfirmPassword = null;
    this.RoleName = null;
    this.PaymentTypeID = 0;
    this.PaymentTypeName = '';
    this.PaymentDate = '';
    this.IsEncashed = false;
    this.EncashementDate = '';
    this.AssignedNozzleID = 0;
  }
}
