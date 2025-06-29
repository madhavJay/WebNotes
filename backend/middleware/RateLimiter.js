const ratelimit = require('../config/upstash');

const ratelimiter = async (req, res, next) => {
    try {
        const { ip } = req;
        const result = await ratelimit.limit("SomeKey");
        
        if (result.success) {
            next();
        } else {
            res.status(429).json({ error: 'Too many requests, please try again later.' });
        }
    } catch (error) {
        console.error('Rate limiter error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = ratelimiter;