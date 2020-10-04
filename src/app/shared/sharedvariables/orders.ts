export class Orders{

    orderId: string;

    datePlaced: string;

    itemsQuantity: Number;

    orderStatus: string;

    firstItemName: string

    firstItemImage: string
}

export class OrderProduct{

    productId: number;

    orderId: number;

    price: number;

    quantity: number;

    name: string;

    image: string;
}

export class OrderDetails{
    name: string;

    address: string;

    additionalInfo: string;

    city: string;

    region: string;

    phoneNumber: string;

    totalItemPrice: number;

    shippingFees: number;

    datePlaced: string;

    status: string;
}