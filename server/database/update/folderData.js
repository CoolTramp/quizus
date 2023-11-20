import chalk from "chalk";
import db from "../db.js";

const updateFolderData = async (userId, data) => {
  const { folderName, oldFolderName, description, imageURL } = data;

  try {
    const QUERY = `UPDATE folders 
                   SET folder_name = $2, description = $3, image_url = $4 
                   WHERE user_id = $1
                   AND folder_name = $5
                   RETURNING user_id`;

    await db.manyOrNone(QUERY, [
      userId,
      folderName,
      description,
      imageURL,
      oldFolderName,
    ]);

    console.log(chalk.green("folder data was changed"));

    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error updateFolderData()"), error);
    return false;
  }
};

export default updateFolderData;
