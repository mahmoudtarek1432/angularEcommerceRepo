import { cartItem } from "./cartItem";

export class UserInfo{

    Email: string;

    FirstName: string;

    LastName: string;

    Address?: string;

    PhoneNumber?: string;

    AdditionalInfo? : string;

    City?: string

    Region?: string;

    CartItems?: userCartItem[];
}

export class userCartItem {
    productId: number;
    quantity: number;
}