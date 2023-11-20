import pg_promise from "pg-promise";
const pgp = pg_promise();

const db = pgp({
  user: "postgres",
  password: "tramp1989",
  host: "localhost",
  port: 5432,
  database: "card",
});

export default db;
