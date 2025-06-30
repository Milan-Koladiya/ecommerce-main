import type { ICategory } from "./categoryType";
import type { ISubcategory } from "./subcategory.types";

export interface IProduct{
    id?:string,
    name:string,
    price:number,
    description?:string,
    category_id?:string,
    subcategory_id?:string,
    image_url?:string,
    category?:ICategory,
    subcategory?:ISubcategory
}