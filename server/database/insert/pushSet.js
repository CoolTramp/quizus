import chalk from "chalk";
import db from "../db.js";
import isSetNameInBase from "../select/utils/isSetNameInBase.js";

const pushSet = async (userId, data) => {
  const { name, setId, description, imageURL, folderNames } = data;
  const QUERY =
    "INSERT INTO sets (user_id, set_name, set_id, description, image_url, directory_location) " +
    "VALUES ($1, $2, $3, $4, $5, $6)";
  try {
    // const exixtedSetNames = await isSetNameInBase(userId, folderName, name);
    // if (exixtedSetNames) return exixtedSetNames;

    await db.none(QUERY, [
      userId,
      name,
      setId,
      description,
      imageURL,
      folderNames,
    ]);
    logCorrectResult(userId);

    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error pushSet()"), error);
    return false;
  }
};

const logCorrectResult = (userId) => {
  console.log(
    chalk.bgBlue("Added new set for user id:\n"),
    userId,
    "\n",
    new Date()
  );
};

export default pushSet;
