const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { rateLimit } =require('express-rate-limit')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
    message:'retry after few minutes'
})


// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
