export interface IPayment {
    id?: string,
    order_id?: string,
    amount?: number,
    status?: string,
    payment_method?: string,
    paid_at?: string
}