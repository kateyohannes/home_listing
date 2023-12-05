import { MongoClient } from "mongodb";

const connection_string : string = Bun.env.CONNECTION_STRING;
const database_name : string = Bun.env.DATABASE_NAME;

let _db : any;
export default {
    connect : async()=>{
        const client = await new MongoClient(connection_string);
        try{
            await client.connect();
            _db = client.db(database_name)            
        }catch(err){
            return err
        }
    },
    getDb: ()=>{
        return _db
    }
}