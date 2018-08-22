export class pp_Nozzle {
  ID: number;
  NozzleCode: string;
  TankID: number;
  OpeningReading: number;
  PetrolPumpCode: string;
  IsEditModal:boolean;
  FuelTypeID: number;
  NozzleName: string;
  ReadingDate:string;
  AssignedTo:number
  /**
   *
   */
  constructor() {
    this.ID=0;
    this.NozzleCode='';
    this.TankID=0;
    this.OpeningReading=0;
    this.PetrolPumpCode = '';
    this.IsEditModal = false;
    this.FuelTypeID = 0;
    this.NozzleName = '';
    this.ReadingDate = '';
    this.AssignedTo = 0;
  }
}
