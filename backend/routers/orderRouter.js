import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils';
import Order from '../models/orderModel';
import User from '../models/userModel';




const orderRouter = express.Router();


orderRouter.get('/summary', 
isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
  const orders = await Order.aggregate(
    [
      {
        $group:{
          _id: null,
          numOrders: {$sum: 1},
          totalSales: {$sum:'$totalPrice'},
        }
      }
    ]
  )

  const users = await User.aggregate(
    [
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1},
        }
      }
    ]
  )

  res.send({ users, orders});
}));



orderRouter.get('/', isAuth, expressAsyncHandler(async(req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
  
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
  const orders = await Order.find({ user: req.user._id});
  res.send(orders);

}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id);

  if(order){
    res.send(order);
  }else{
    res.status(404).send({ message: 'Pedido não encontrado'});
  }
}));

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'Compra realizada com sucesso!', order: createdOrder });
  })
);


orderRouter.delete('/:id', 
isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
     const order = await Order.findById(req.params.id);

     if(order){
         const deletedOrder = await order.remove();
         res.send({ message: 'Pedido deletado !', product: deletedOrder});

     }else{
         res.send(404).send({ message: 'Pedido não encontrado'});
     }
}));

orderRouter.put('/:id/pay',   isAuth,
expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment.paymentResult = {
      payerID: req.body.payerID,
      paymentID: req.body.paymentID,
      orderID: req.body.orderID,
    }
    const updateOrder = await order.save();
    res.send({ message: 'Pedido Pago', order: updateOrder});

  }else{
    res.status(404).send({ message: 'Pedido em aberto'});
  }
}));



export default orderRouter;
