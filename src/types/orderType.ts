import type { IProduct } from "./product.types"

export interface IOrder_items {
    id?:string,
    order_id?: string,
    product_id?: string
    price?: number,
    quantity?: number,
    IOrder?:IOrder,
        product?:IProduct

}

export interface IOrder {
    id?: string,
    user_id?: string,
    total_amount?: number,
    status?: string,
    payment_reference?: string,
    order_items?:IOrder_items[]
}

export interface createOrderType{
    items?:IOrder_items[],
    payment_reference:string
}