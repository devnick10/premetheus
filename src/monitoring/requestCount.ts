import { Counter } from "prom-client";

export const counter = new Counter({
    name: "HTTP_number_of_request", // here we need to mention name and help as a discription
    help: "Number of HTTP request",
    labelNames: ["method", "route", "status_code"]  // info lables 
})

