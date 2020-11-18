import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 5000
const MONGODB_URI = 'mongodb://127.0.0.1:27017/amazona'

mongoose.connect(process.env.MONGODB_URL || MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter);

app.use('/api/products', productRouter)

app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send('Server is Ready');
})

app.use((err, req,res, next) => {
    res.status(500).send({message: err.message});
})

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})