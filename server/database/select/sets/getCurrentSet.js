import chalk from "chalk";
import db from "../../db.js";

async function getCurrentSet(setName, setId) {
  const QUERY = `SELECT * 
                 FROM sets
                 WHERE set_name= $1
                 AND set_id= $2
                 `;
  try {
    const answer = await db.oneOrNone(QUERY, [setName, setId]);
    // console.log("answer:", answer);

    return answer ? answer : { setName: answer };
  } catch (error) {
    console.log(chalk.bgRed("error from getCurrentSet:\n"), error);
    return false;
  }
}
export default getCurrentSet;
