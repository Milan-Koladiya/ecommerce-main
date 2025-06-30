import type { IProduct } from "./product.type"

export interface ICart {
    id?: string,
    user_id?: string,
    product_id?: string,
    quantity: number,
    product?:IProduct
}

export interface IEditCartArgs{
    product_id:string,
    body:ICart
}