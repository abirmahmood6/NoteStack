import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import dotenv from "dotenv";
dotenv.config();  // gives access to our .env file to use environment variables.
// create a ratelimiter that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), //Create a new Upstash Redis instance from environment variables.
    limiter:Ratelimit.slidingWindow(10,"20 s"),
});

export default ratelimit;