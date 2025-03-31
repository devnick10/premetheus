import { NextFunction, Request, Response } from "express";
import { gauge } from "./activeRequest";
import { counter } from "./requestCount";
import { httpRequestDurationMicroseconds } from "./requestTime";

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    // here gauge increase when user comes 
    gauge.inc();

    res.on("finish", () => {
        const endTime = Date.now();
        const duration = startTime - endTime;
        // we need to config info lable here 
        counter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration)

        // here we need to decrease the gauge 
        gauge.dec();

    })

    next()
}