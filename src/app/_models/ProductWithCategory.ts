import { AllProduct } from "../AllProduct";

export class ProductWithCategory {
    CategoryName:string;
    pumpProducts : AllProduct[]
    constructor() {
        this.pumpProducts=null;
        this.CategoryName=null;
    }
}