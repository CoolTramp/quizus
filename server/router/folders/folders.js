import router from "../authorization.js";
import { authorization } from "../../utils/utils.js";
import getFolders from "../../database/select/folders/getFolders.js";
import chalk from "chalk";

router.get("/:userId/folders/", authorization, async (req, res) => {
  try {
    const userId = req.params.userId;
    const answer = await getFolders(userId);
    res.send(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from /:userId/folders/"), error);
  }
});

export default router;
