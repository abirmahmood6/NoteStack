import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        const{success} = await ratelimit.limit("my-limit-key") //the key can be user_id etc, in cases where we have authentication

        if(!success){
            return res.status(429).json({
                message:"Too many request, please try again later"
            });
        }
        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}


export default rateLimiter;