
declare module "bun"{
    interface Env{
        PORT : string
        CONNECTION_STRING : string
        DATABASE_NAME : string

        JWT_SECRET : string
    }
}