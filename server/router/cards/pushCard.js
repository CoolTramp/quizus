import router from "../authorization.js";
import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import pushCard from "../../database/insert/pushCard.js";

router.post("/:userId/push-card/", authorization, async (req, res) => {
  try {
    const data = req.body;
    const { userId } = req.params;
    const answer = await pushCard(userId, data);
    res.send(answer);
  } catch (error) {
    console.error(chalk.bgRed("error frow push-card: \n"), error);
  }
});
export default router;
