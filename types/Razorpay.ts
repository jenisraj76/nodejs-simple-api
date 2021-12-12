export interface OrderEntity {
    "id": string,
    "entity": string,
    "amount": number,
    "amount_paid": number,
    "amount_due": number,
    "currency": string,
    "receipt": string,
    "status": string,
    "attempts": number,
    "notes": {
        [key: string]: string,
    }
    "created_at": number
}
export  interface SuccessCallbackReq {
    "razorpay_payment_id": string,
    "razorpay_order_id": string,
    "razorpay_signature": string,
    "notes": {// notes used for our internel purpose
        [key: string]: string,
    }
    [key: string]: any
}
