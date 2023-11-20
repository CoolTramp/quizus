import router from "../authorization.js";
import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import pushSet from "../../database/insert/pushSet.js";

router.post("/:userId/push-set/", authorization, async (req, res) => {
  try {
    const data = req.body;
    const { userId } = req.params;
    const answer = await pushSet(userId, data);
    res.send(answer);
  } catch (error) {
    console.error(chalk.bgRed("error frow push-set: \n"), error);
  }
});
export default router;
