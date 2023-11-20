import router from "../authorization.js";
import chalk from "chalk";
import { authorization } from "./../../utils/utils.js";
import getCurrentSet from "../../database/select/sets/getCurrentSet.js";

router.get(
  "/:userId/current-set/:setName/:setId",
  authorization,
  async (req, res) => {
    let { setName, setId } = req.params;
    setName = setName.replace("-", " ");
    try {
      const answer = await getCurrentSet(setName, setId);
      res.json(answer);
    } catch (error) {
      console.log(chalk.bgRed("error from currentSet.js:\n"), error);
    }
  }
);

export default router;
