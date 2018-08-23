import { pp_Nozzle } from './pp_Nozzle';
export class pp_Tank {
  ID: number;
  PetrolPumpCode: string;
  TankCode: string;
  FuelTypeID: number;
  TankCapacity: string;
  pp_Nozzles:pp_Nozzle[];
  TankName:string;
  ReadingDate:string;
  OpeningReading:string;
  DipReadingDate:string;
  DipOpeningReading:string;
  ReadingType:number;
  DipReadingType:number;
  IsEditModal:boolean;
  /**
   *
   */
  constructor() {
    this.ID=0;
    this.PetrolPumpCode=null;
    this.TankCode=null;
    this.FuelTypeID=0;
    this.TankCapacity='';
    this.pp_Nozzles=Array<pp_Nozzle>();
    this.TankName = '';
    this.ReadingDate = '';
    this.OpeningReading = '';
    this.DipReadingDate = '';
    this.DipOpeningReading = '';
    this.ReadingType = 1;
    this.IsEditModal = false;
    this.DipReadingType = 2;
  }
}
