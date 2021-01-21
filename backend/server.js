import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import bodyParser from 'body-parser';



mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log('Connected to mongoDB')
})
.catch((error) => {
    console.log(error.reason)
});

const app = express();

app.use(cors());

app.use(bodyParser.json());
 
app.use('/api/users', userRouter);

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
   const product = data.products.find((x) => x._id === req.params.id);
   if(product){
       res.send(product);

   }else{
       res.status(404).send({ message: 'Produto não encontrado'});
   }
});

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'Erro na validação' ? 400 : 500;
    res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
    console.log('serve at http://localhost:5000')
});