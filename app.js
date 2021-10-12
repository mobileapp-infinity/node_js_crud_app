require('dotenv').config({ path: './config/dev.env' });
require('./config/db');
const express = require('express');
const errorHandler = require('./middleware/error_handler_middleware');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user_route');
const payoutModeRouter = require('./routers/payout_mode_route');
const productRouter = require('./routers/product_route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/user',userRouter);
app.use('/payoutMode',payoutModeRouter);
app.use('/product',productRouter);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running ona port:- ${PORT}`);
});



