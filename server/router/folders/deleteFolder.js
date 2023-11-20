import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import deleteFolder from "../../database/delete/deleteFolder.js";
import router from "../authorization.js";

router.delete("/:userId/:folderName/", authorization, async (req, res) => {
  const userId = req.params.userId;
  const folderName = req.params.folderName.replace("-", " ");

  try {
    const answer = await deleteFolder(userId, folderName);
    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from deleteFolder.js:\n"), error);
  }
});

export default router;
