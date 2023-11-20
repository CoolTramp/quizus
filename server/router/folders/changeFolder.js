import router from "../authorization.js";
import { authorization } from "./../../utils/utils.js";
import updateFolderData from "../../database/update/folderData.js";
import chalk from "chalk";

router.post("/:userId/change-folder/", authorization, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.userId;

    const answer = await updateFolderData(userId, data);
    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from changeFolder.js:\n"), error);
  }
});

export default router;
