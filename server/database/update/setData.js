import chalk from "chalk";
import db from "../db.js";

const updateSetData = async (userId, data) => {
  const { name, setId, folderNames, description, imageURL } = data;
  try {
    const QUERY = `UPDATE sets 
                   SET set_name= $2, directory_location= $3, description = $4, image_url = $5
                   WHERE user_id = $1
                   AND set_id = $6
                   RETURNING user_id`;

    await db.manyOrNone(QUERY, [
      userId,
      name,
      folderNames,
      description,
      imageURL,
      setId,
    ]);
    console.log(chalk.green("card data was changed"));

    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error setData()"), error);
    return false;
  }
};

export default updateSetData;
