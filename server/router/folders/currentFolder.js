import router from "../authorization.js";
import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import getCurrentFolder from "../../database/select/folders/getCurrentFolder.js";

router.get("/:userId/:folderName/", authorization, async (req, res) => {
  const folderName = req.params.folderName.replace("-", " ");
  try {
    const answer = await getCurrentFolder(folderName);
    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from currentFolder.js:\n"), error);
  }
});

export default router;
