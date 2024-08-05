require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes')


const errorHandlerMiddleware=require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(cors({
    origin: 'https://home-decor-1905.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use(express.json());

app.get('/health',(req,res)=>{
    res.send('Ok');
})

app.use('/api/v1',authRouter);
app.use('/api/v1',productRouter);
app.use('/api/v1',orderRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware)
const port = process.env.PORT || 9000;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    }catch(error){  
        console.log('connection error', error);
    }
}
start();