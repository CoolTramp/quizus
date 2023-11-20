import chalk from "chalk";
import db from "../db.js";
import isFolderNameInBase from "../select/utils/isFolderNameInBase.js";

const pushFolder = async (userId, data) => {
  const { folderName, description, imageURL } = data;
  const QUERY =
    "INSERT INTO folders (user_id, folder_name, description, image_url) VALUES ($1, $2, $3, $4)";
  try {
    const existedFolderNames = await isFolderNameInBase(userId, folderName);
    if (existedFolderNames) return existedFolderNames;

    await db.none(QUERY, [userId, folderName, description, imageURL]);
    logCorrectResult(userId);
    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error pushFolder()"), error);
  }
};

const logCorrectResult = (userId) => {
  console.log(
    chalk.bgBlue("Added new folder for user id:\n"),
    userId,
    "\n",
    new Date()
  );
};

export default pushFolder;
