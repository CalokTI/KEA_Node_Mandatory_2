import { Router } from "express";
const router = Router();

import { encryptPassword, comparePassword } from "../encryption/password.js";
import { mailCreate } from "../mail/nodeMailer.js";

import db from "../database/createConnection.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";


router.post('/users/register', async (req, res) => {
    const { mail, password, firstName } = req.body;
    const userExists = await db.users.findOne({ mail });

    if (userExists) {
        res.status(409).send("username already in use"); //conflict (username taken)
    }
    else {
        const hashPassword = await encryptPassword(password)
        db.users.insertOne({ mail, hashPassword, firstName })
        mailCreate(mail);
        res.status(201).send({ mail, firstName }) //created
    }
})


router.post('/users/login', async (req, res) => {
    const { mail, password } = req.body;
    const userExists = await db.users.findOne({ mail });

    if (userExists && await comparePassword(password, userExists.hashPassword)) {
        const accessToken = jwt.sign(userExists, process.env.ACCESS_TOKEN_SECRET)
        res.setHeader('Set-Cookie', cookie.serialize('jwt', accessToken, {path: '/', httpOnly: true, secure: true}));
        res.status(200).send("Success");
    }
    else {
        res.status(401).send("Incorrect login")
    }
})

router.post('/users/logout', (req, res) =>{
    res.clearCookie('jwt', { path: '/' })
    res.status(200).send("logged out")
})

export default router;