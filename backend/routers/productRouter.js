import express  from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../utils';


const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler( async(req, res) =>{
     const products = await Product.find({});
     res.send(products);

 }));

productRouter.get('/:id', expressAsyncHandler( async(req, res) =>{
     const product = await Product.findById(req.params.id);
     res.send(product);

 }));

productRouter.post('/',
 isAuth, isAdmin, expressAsyncHandler( async(req, res) => {

    const product = new Product({
        name: 'Camiseta...',
        description: 'Cor azul...',
        category: 'Vestuário masculino...',
        brand: 'Adidas...',
        image: '/images/product-1.jpg',

    });
    const createdProduct = await product.save();
    if(createdProduct){
        res.status(201).send({
              message: 'Produto criado com Sucesso!',
              product: createdProduct
        });
    }else{
        res.status(500).send({ message: 'Erro ao criar produto'});
    }
}));


productRouter.put('/:id', 
isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
        if(updatedProduct){
            res.send({ message: 'Produto atualizado com sucesso!', 
            product: updatedProduct
        });

        }else{
            res.status(500).send({message: 'Erro ao atualizar produto'});
        }

    }else{
        res.status(404).send({ message: 'Produto não encontrado'});
    }
}));



productRouter.delete('/:id', 
isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
     const product = await Product.findById(req.params.id);

     if(product){
         const deletedProduct = await product.remove();
         res.send({ message: 'Prouto deletado !', product: deletedProduct});

     }else{
         res.send(404).send({ message: 'Produto não encontrado'});
     }
}));


export default productRouter;