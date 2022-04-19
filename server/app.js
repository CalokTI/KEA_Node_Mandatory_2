import express from "express";
const app = express();

app.use(express.json());

import rateLimit from "express-rate-limit";

import cors from "cors"; //TODO set cors for specific site only?
app.use(cors());

import path from "path";
app.use(express.static(path.resolve('../client/public')));




const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 9999, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter, authLimiter);

import storeRouter from "./routers/storeRouter.js";
app.use(storeRouter);


app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("running on port", PORT);
})