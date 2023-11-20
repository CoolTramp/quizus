import express from "express";
import { authorization } from "../utils/utils.js";
const router = express.Router();

router.post("/:userId", authorization, (req, res) => {
  const { name } = req.user;
  res.status(200).send({ profile: true, name });
});

export default router;
