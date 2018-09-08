export class TankVsNozzle {
    ID:number;
    TankName:string;
    NozzleName:string;
    TankClosingReading:number;
    TankClosingStock:number;
    NozzleFuelSale:number;
    NozzleOpeningReading:number;
    NozzleClosingReading:number;

    constructor() {
        this.ID=0;
        this.TankName="";
        this.NozzleName="";
        this.NozzleClosingReading=0;
        this.TankClosingStock=0;
        this.TankClosingReading=0;
        this.NozzleOpeningReading=0;
        this.NozzleFuelSale=0;
    }
}