import { Router } from "express";
import { authenticateToken } from "../middleware/authentication.js";
const router = Router();

router.post('/authorize', authenticateToken, (req, res) => {
    res.status(200).send("good to go");
})

export default router;