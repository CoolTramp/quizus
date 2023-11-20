import chalk from "chalk";
import db from "../db.js";

const pushUserIntoBase = (data) => {
  const { id, name, mail, password } = data;
  const QUERY =
    "INSERT INTO users (id, name, mail, password) VALUES ($1, $2, $3, $4) RETURNING id";

  return new Promise((resolve) => {
    db.one(QUERY, [id, name, mail, password])
      .then((data) => {
        logCorrectResult(data.id);
        resolve(true);
      })
      .catch((error) => {
        console.error(chalk.bgRed("Error pushing user:"), error);
      });
  });
};

const logCorrectResult = (id) => {
  console.log(chalk.bgBlue("Added new user with id:\n"), id, "\n", new Date());
};

export default pushUserIntoBase;
