import crypto = require('crypto');
import Razorpay = require('razorpay');
import { getConnection } from 'typeorm';
import { Payments } from '../../models/Payments.entity';
import { OrderEntity, SuccessCallbackReq } from '../../types/Razorpay';

export const intiatePayment = async (id: string) => {
    //create razorpay instance
    var instance = new Razorpay({
        key_id: 'YOUR_KEY_ID',
        key_secret: 'YOUR_KEY_SECRET',
    });
    // this is our order id stored in database

    let payment = await getPayment(id);
    if (!payment) throw new Error('payment not found');
    // create a new payment order
    let order: OrderEntity = await instance.orders.create({
        amount: payment.amount,
        currency: payment.currency,
        receipt: "receipt#1",
        notes: { id: id, user_id: payment.user }
    });
    //store initial ref into database
    await updateInitialPaymentRef(id, order);

    return order;

    //after this step need to impliment the some process using this order details

}

const getPayment = async (paymentId: string) => {
    let result = await getConnection().getRepository(Payments).findOne({ where: { id: paymentId } });
    return result;
}

const updateInitialPaymentRef = async (paymentId: string, order: OrderEntity) => {
    let result = await getConnection().getRepository(Payments).update({ id: paymentId }, { initial_ref: order });
    return result;
}

const updateFullFillPaymentRef = async (paymentId: string, ref: SuccessCallbackReq) => {
    let result = await getConnection().getRepository(Payments).update({ id: paymentId },
        {
            fulfillment_ref: ref, signature: ref.signature,
            payment_id: ref.razorpay_payment_id,
            order_id: ref.razorpay_order_id
        });
    return result;
}


// this is the callback from the razerpay api
// or can send by the front end
export const verifyPayment = async (req: SuccessCallbackReq) => {

    let retunValue = { signatureIsValid: false };
    // get our order from db
    let order = await getPayment(req.notes['id']);
    if (!order || !order.initial_ref) return retunValue;
    //genrate the signature our self
    let generated_signature = crypto.createHmac('sha256', 'YOUR_KEY_SECRET')
        .update(order.initial_ref['id'] + "|" + req.razorpay_payment_id).digest("base64");

    if (generated_signature == req.razorpay_signature) {
        //store the finel ref to our database
        await updateFullFillPaymentRef(req.notes['id'], req);
        retunValue.signatureIsValid = true;
    }
    return retunValue;
}
