export interface ICategory{
    id:string,
    name:string,
    seller_id:string
}

export interface EditCategoryType{
    id:string,
    body:ICategory
}