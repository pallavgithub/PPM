import { pp_Nozzle } from './pp_Nozzle';
import { ReadingTypeDetail } from './readingTypeDetail';
export class pp_Tank {
  ID: number;
  PetrolPumpCode: string;
  TankCode: string;
  FuelTypeID: number;
  ChartTypeID: number;
  TankCapacity: number;
  pp_Nozzles:pp_Nozzle[];
  TankName:string;
  ReadingDate:string;
  OpeningReading:string;
  Stock:number;
  OpeningStock:string;
  ClosingReading:string;
  ClosingStock:string;
  DipReadingDate:string;
  DipOpeningReading:number;
  ReadingType:number;
  DipReadingType:number;
  IsEditModal:boolean;
  ProductName:string;
  pp_TankReading:ReadingTypeDetail[]
  /**
   *
   */
  constructor() {
    this.ID=0;
    this.PetrolPumpCode=null;
    this.TankCode=null;
    this.FuelTypeID=0;
    this.TankCapacity=0;
    this.pp_Nozzles=Array<pp_Nozzle>();
    this.TankName = '';
    this.ReadingDate = '';
    this.OpeningReading = '';
    this.OpeningStock = '';
    this.Stock = 0;
    this.DipReadingDate = '';
    this.DipOpeningReading = 0;
    this.ReadingType = 1;
    this.IsEditModal = false;
    this.DipReadingType = 2;
    this.ProductName = '';
    this.ChartTypeID = 0;
    this.pp_TankReading = Array<ReadingTypeDetail>();
  }
}
