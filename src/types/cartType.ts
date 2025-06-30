import type { IProduct } from "./product.types"

export interface ICart {
    id?: string,
    user_id?: string,
    product_id?: string,
    quantity: number,
    product?:IProduct
}



export interface EditCartType{
    product_id:string,
    body:ICart
}