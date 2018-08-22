export class pp_User {
  ID: number;
  UserId: string;
  Password: string;
  PetrolPumpCode: string;
  FullName: string;
  Email: string;
  RoleID: number;
  Phone: string;
  Address: string;
  CreditLimit: number;
  Description: string;
  IsEditModal:boolean;
  
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
    this.CreditLimit=0;
    this.Description=null;
    this.IsEditModal = false;
  }
}
