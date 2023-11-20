import router from "../authorization.js";
import { authorization } from "./../../utils/utils.js";
import updateSetData from "../../database/update/setData.js";
import chalk from "chalk";

router.post("/:userId/change-set/", authorization, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const answer = await updateSetData(userId, data);
    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from changeFolder.js:\n"), error);
  }
});

export default router;
