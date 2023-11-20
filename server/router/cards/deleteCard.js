import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import deleteCard from "../../database/delete/deleteCard.js";
import router from "../authorization.js";

router.delete("/:userId/del-card/:cardId/", authorization, async (req, res) => {
  const { userId, cardId } = req.params;
  try {
    const answer = await deleteCard(userId, cardId);
    res.json(answer);
  } catch (error) {
    console.log(chalk.bgRed("error from deleteCard.js:\n"), error);
  }
});

export default router;
