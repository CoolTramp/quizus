import router from "../authorization.js";
import { authorization } from "../../utils/utils.js";
import chalk from "chalk";
import getCards from "../../database/select/cards/getCards.js";

router.get("/:userId/:setId/get-cards", authorization, async (req, res) => {
  try {
    let { userId, setId } = req.params;
    const answer = await getCards(userId, setId);
    res.send(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from /get-cards/\n,"), error);
  }
});

export default router;
