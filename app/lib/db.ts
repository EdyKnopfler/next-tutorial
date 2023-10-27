import { Pool } from "pg";

let conn: Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT as string),
    database: process.env.POSTGRES_DATABASE,
  });
}

export default conn as Pool;
