export class ReadingTypeDetail {
    ID:number;
    PetrolPumpCode:string;
    ReadingType:number;
    ReadingDate:string;
    OpeningReading:number;
    ReadingTypeName:string;
    constructor() {
        this.ID = 0;
        this.ReadingType=0;
        this.ReadingDate=null;
        this.OpeningReading=0;
        this.PetrolPumpCode = '';
        this.ReadingTypeName = '';
    }
}