export class Database {
    static readonly CONNECTION = "postgres";
    static readonly HOST = process.env.HOST || "localhost";
    static readonly USERNAME = process.env.USERNAME || "";
    static readonly PASSWORD = process.env.PASSWORD || "";
    static readonly DATABASE = process.env.DATABASE || "";
    static readonly SCHEMA = process.env.SCHEMA || "";
    static readonly PORT = Number(process.env.PORT);
    static readonly SYNCHRONIZE = false;
    static readonly LOGGING = false;
    static readonly MIGRATE = false;
    static readonly ENTITIES = "dist/models/**/*.entity.js";
}