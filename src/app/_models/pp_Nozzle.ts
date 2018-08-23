export class pp_Nozzle {
  ID: number;
  NozzleCode: string;
  TankID: number;
  OpeningReading: string;
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
    this.OpeningReading='';
    this.PetrolPumpCode = '';
    this.IsEditModal = false;
    this.FuelTypeID = 0;
    this.NozzleName = '';
    this.ReadingDate = '';
    this.AssignedTo = 0;
  }
}
