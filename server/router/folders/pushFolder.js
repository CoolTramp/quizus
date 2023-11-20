import express from "express";
import { authorization } from "./../../utils/utils.js";
import pushFolder from "../../database/insert/pushFolder.js";
import router from "../authorization.js";

router.post("/:userId/push-folder/", authorization, async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;
  const answer = await pushFolder(userId, data);
  res.send(answer);
});

export default router;
