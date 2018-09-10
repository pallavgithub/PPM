import { IncompleteProducts } from "./IncompleteProducts";
import { IncompleteTanks } from "./IncompleteTanks";
import { IncompleteNozzles } from "./IncompleteNozzles";

export class IncompleteDailyData {
    public incompleteProduct:IncompleteProducts;
    public incompleteTank:IncompleteTanks;
    public incompleteNozzle:IncompleteNozzles;
    constructor() {
        this.incompleteProduct=new IncompleteProducts();
        this.incompleteTank= new IncompleteTanks();
        this.incompleteNozzle=new IncompleteNozzles();
    }
}