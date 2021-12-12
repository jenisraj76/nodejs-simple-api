import { Column, Entity, OneToMany } from "typeorm";
import { Payments } from "./Payments.entity";
@Entity("user_profile", { schema: "public" })
export class UserProfile {

    @Column("text", {
        nullable: false,
        primary: true,
        name: "userid"
    })
    userid: string;

    @Column("text", {
        nullable: false,
        name: "emailid"
    })
    emailid: string;

    @Column("text", {
        nullable: true,
        name: "firstname"
    })
    firstname: string;

    @Column("text", {
        nullable: true,
        name: "lastname"
    })
    lastname: string;

    @Column("text", {
        nullable: false,
        name: "user_token"
    })
    user_token: string;

    @Column("timestamp with time zone", {
        nullable: false,
        default: () => "now()",
        name: "created_at"
    })
    created_at: Date;

    @Column("text", {
        nullable: true,
        name: "authprovider"
    })
    authprovider: string | null;

    @Column("text", {
        nullable: true,
        name: "roles"
    })
    roles: string;

    @Column("boolean", {
        nullable: true,
        default: () => "true",
        name: "isactive"
    })
    isactive: boolean;

    @Column("text", {
        nullable: true,
        name: "password_hash"
    })
    password_hash: string | null;

    @OneToMany(() => Payments, (payments: Payments) => payments.user)
    orderPaymentss: Payments[];
}
