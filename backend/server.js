import express from 'express';
import cors from 'cors';
import data from './data.js'; 
import  mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRoute.js';


mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).then(() => {
    console.log('Conected to mongodb')

}).catch((error) => {
 console.log(error.reason)

});

const app = express();
app.use(cors());
app.use('/api/users', userRouter)
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);

    }else{
        res.status(404).send({message: 'Product não encontrado!'})
    }

})


app.listen(5000, () => {
    console.log('Serve at http://localhost:5000');
});