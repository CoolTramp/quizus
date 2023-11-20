import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import deleteSet from "../../database/delete/deleteSet.js";
import router from "../authorization.js";

router.delete("/:userId/del/:setId/", authorization, async (req, res) => {
  const { userId, setId } = req.params;
  try {
    const answer = await deleteSet(userId, setId);
    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from deleteSet.js:\n"), error);
  }
});

export default router;
