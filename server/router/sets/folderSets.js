import router from "../authorization.js";
import { authorization } from "../../utils/utils.js";
import getFolderSets from "../../database/select/sets/getFolderSets.js";
import chalk from "chalk";

router.get(
  "/:userId/:folderName/folder-sets/",
  authorization,
  async (req, res) => {
    try {
      let { userId, folderName } = req.params;
      folderName = folderName.replace("-", " ");
      const answer = await getFolderSets(userId, folderName);
      res.send(answer);
    } catch (error) {
      console.log(chalk.bgRed("error from /folder-sets/\n,"), error);
    }
  }
);

export default router;
