import { Gauge } from "prom-client";

// we create a Gauge for tracking active users 
export const gauge = new Gauge({
    name:"active_requests",
    help:"Number of active requests"
})

