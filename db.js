import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.POSTGRES_CONNECTION_STRING);

export default sql;
