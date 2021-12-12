import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "./User.entity";
@Entity("payments", { schema: "public" })
export class Payments {

    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "payment_id"
    })
    id: string;


    @Column("numeric", {
        nullable: false,
        precision: 18,
        scale: 2,
        name: "amount"
    })
    amount: number;


    @Column("character varying", {
        nullable: false,
        length: 100,
        name: "currency"
    })
    currency: string;



    @ManyToOne(() => UserProfile, (user_profile: UserProfile) => user_profile.orderPaymentss, { nullable: true, })
    @JoinColumn({ name: 'user_id' })
    user: UserProfile | null;


    @Column("timestamp with time zone", {
        nullable: true,
        default: () => "now()",
        name: "created_at"
    })
    created_at: Date;


    @Column("timestamp with time zone", {
        nullable: true,
        name: "fulfilled_ts"
    })
    fulfilled_ts: Date | null;


    @Column("integer", {
        nullable: false,
        name: "status"
    })
    status: number;


    @Column("jsonb", {
        nullable: true,
        name: "initial_ref"
    })
    initial_ref: object | null;


    @Column("jsonb", {
        nullable: true,
        name: "fulfillment_ref"
    })
    fulfillment_ref: object | null;

    @Column("text", {
        nullable: true,
        name: "order_id"
    })
    order_id: string | null;


    @Column("text", {
        nullable: true,
        name: "payment_id"
    })
    payment_id: string | null;

    @Column("text", {
        nullable: true,
        name: "signature"
    })
    signature: string | null;


}
