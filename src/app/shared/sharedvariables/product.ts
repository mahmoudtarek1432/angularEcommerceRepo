import { Review } from "./review";

export class Product{
    name: string;
    id: number;
    imagePathsArr: string[];
    price: number;
    salePercent: number;
    quantityAvailable: number;
    totalRatings: number;
    description: string;
    reviews: Review[];
}