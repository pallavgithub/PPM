export class ReadingTypeDetail {
    ID:number;
    PetrolPumpCode:string;
    ReadingType:number;
    ReadingDate:string;
    OpeningReading:string;
    ReadingTypeName:string;
    constructor() {
        this.ID = 0;
        this.ReadingType=0;
        this.ReadingDate=null;
        this.OpeningReading='';
        this.PetrolPumpCode = '';
        this.ReadingTypeName = '';
    }
}