import router from "../authorization.js";
import { authorization } from "./../../utils/utils.js";
import chalk from "chalk";
import markCard from "../../database/update/markCard.js";

router.post("/:userId/mark-card/", authorization, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const answer = await markCard(userId, data);

    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from changeCard.js:\n"), error);
  }
});

export default router;
