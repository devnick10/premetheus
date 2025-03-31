import express from "express";
import { requestCount } from "./monitoring/requestCount";
import client from "prom-client";

const app = express();

app.use(requestCount);

app.get('/user', (req, res, next) => {
    let user = {
        name: "nick",
        age: "23"
    }

    res.json({
        name: user.name
    });
})

app.get('/metrics', async (req, res, next) => {
    const metrics = await client.register.metrics();
    res.set("Content-Tyep", client.register.contentType)
    res.end(metrics);
})

app.listen(3000);