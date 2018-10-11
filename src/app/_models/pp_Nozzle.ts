export class pp_Nozzle {
  ID: number;
  NozzleCode: string;
  TankID: number;
  OpeningReading: string;
  ClosingReading: string;
  PetrolPumpCode: string;
  IsEditModal:boolean;
  IsActive:boolean;
  FuelTypeID: number;
  NozzleName: string;
  ReadingDate:string;
  AssignedTo:number;
  AssignedUserName:string;
  TankName:string;
  /**
   *
   */
  constructor() {
    this.ID=0;
    this.NozzleCode='';
    this.TankID=0;
    this.OpeningReading='';    
    this.ClosingReading='';
    this.PetrolPumpCode = '';
    this.IsEditModal = false;
    this.IsActive = true;
    this.FuelTypeID = 0;
    this.NozzleName = '';
    this.ReadingDate = '';
    this.AssignedTo = 0;
    this.AssignedUserName = '';
    this.TankName = '';
  }
}
