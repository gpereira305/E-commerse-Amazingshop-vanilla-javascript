import express from 'express';
import cors from 'cors';
import data from './data.js'; 



const app = express();
app.use(cors());
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