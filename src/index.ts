import express from "express";
import client from "prom-client"
import { metricsMiddleware } from "./monitoring";
const app = express();

// here we add middleware or login before route 

// let counter = new Counter({
//     name:"HTTP_number_of_request",
//     help:"Number of HTTP request"
// })

app.use(metricsMiddleware)

app.get('/user', async(req, res) => {
    // counter.inc()
   
    // intetionsnally await the request 
    await new Promise((resolve)=> setTimeout(resolve,10*1000))
   
    res.json({
        name: "nick",
        age: "23"
    })
})

// wee need to expose another endpoint for metrics 

app.get('/metrics', async(req, res, next) => {
    const metrics = await client.register.metrics();

    res.set("Content-Type", client.register.contentType);
    res.end(metrics);
})


app.listen(3000);