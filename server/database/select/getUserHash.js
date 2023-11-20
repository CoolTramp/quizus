import db from "../db.js";
import chalk from "chalk";

const getUserHash = async (mail) => {
  const QUERY = "SELECT password from users WHERE mail=$1";
  try {
    const answer = await db.oneOrNone(QUERY, [mail]);
    logResult(answer);
    return answer;
  } catch (e) {
    console.error(chalk.bgRed("the error from the query of getUserHash"), e);
  }
};

const logResult = (answer) => {
  console.log(
    answer
      ? chalk.green("the user hash was taked")
      : chalk.red("the user hash was not exist")
  );
};

export default getUserHash;
