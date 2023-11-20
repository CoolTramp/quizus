import router from "../authorization.js";
import { authorization } from "../../utils/utils.js";
import getSets from "../../database/select/sets/getSets.js";

router.get("/:userId/sets/", authorization, async (req, res) => {
  const userId = req.params.userId;
  const answer = await getSets(userId);
  res.send(answer);
});

export default router;
