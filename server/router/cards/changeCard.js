import router from "../authorization.js";
import { authorization } from "./../../utils/utils.js";
import updataCardData from "../../database/update/cardData.js";
import chalk from "chalk";

router.post("/:userId/change-card/", authorization, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const answer = await updataCardData(userId, data);

    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from changeCard.js:\n"), error);
  }
});

export default router;
