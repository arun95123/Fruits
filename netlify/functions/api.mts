import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get('hello', (req, res) => {
    res.send('Hello World')
})
router.get("/get-fruits", async (req, res) => {
    const url = 'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws/'
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        res.send(json);
    } catch (error) {
        res.status(404).send()
    }
});

api.use("/api/", router);

export const handler = serverless(api);