import { getCartItems, getShipping, getPayment, clearCart } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps'
import { hideLoading, showLoading, showMessage } from '../../utils';
import { createOrder } from '../api';




const convertCartToOrders = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location = '/cart';
    }

    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash = '/shipping';
    }

    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash = '/payment';
    }

    const itemsPrice = orderItems.reduce((accum, current) => 
    accum + current.price * current.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 8.50;
    const taxPrice = Math.round(0.05 * itemsPrice * 100) / 100;
    const totalPrice = (itemsPrice + shippingPrice + taxPrice);  
    
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }

};
const PlaceOrderScreen = {
    after_render: async () => {
        document.getElementById('placeorder-button')
        .addEventListener('click', async () => {
            
            const order = convertCartToOrders();
            showLoading();
    
            const data = await createOrder(order)
            hideLoading();
            if(data.error){
                showMessage(data.error)
    
            }else{
                clearCart();
                document.location.hash = `/order/${data.order._id}`;
            }

        });
    },

    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice

        } = convertCartToOrders();   

        return `
          <div style="width: 100%;">
     
          ${CheckoutSteps.render({
            step1: true,
            step2: true,
            step3: true,
            step4: true,
        })}

             <div class="order">
                  <div class="order-info">
                      <div class="order-header">
                         <h2 style="margin-bottom: 2rem; text-transform: uppercase;">Endereço de entrega</h2>
                         <div style="text-transform: capitalize; font-size: 1.3rem;">
                             ${shipping.address} -
                             ${shipping.city} -
                             ${shipping.postalCode} -
                             ${shipping.country}
                         </div>
                      </div>

                      <div class="order-header">
                           <h2 style="margin-bottom: 2rem; text-transform: uppercase;">Pagamento</h2>
                           <div>
                               Forma de pagamento: ${payment.paymentMethod}
                           </div>
                      </div>

                      <div class="order-area">
                          <ul>
                            <li class="order-data">
                               <h2 style="text-transform: uppercase;">Itens no carrinho</h2>
                               <div></div>
                            </li> 
                               ${orderItems.map(
                                   (item) =>`
                                    <li class="cart-products">
                                       <div class="cart-image">
                                          <a href="/#/"> 
                                              <img src="${item.image}" alt="${item.name}" style="max-width: 12rem;"/>
                                          </a>
                                       
                                       <div class="cart-item">
                                       
                                           <p style="text-transform: uppercase">
                                               Info do produto:  
                                           </p>
                                           <p style="color: grey;">
                                              ${item.name} 
                                           </p>
                                          
                                          

                                           <p style="text-transform: uppercase">
                                              Quantidade: ${item.qty}
                                           </p>

                                           <p class="cart-price" style="text-transform: uppercase">
                                             Preço da unidade: R$ ${item.price}
                                           </p>
                                      </div>
                                       </div>
                                    </li>
                                   `).join('\n')}
                          </ul>
                      </div>
                  </div>
                <div class="order-action">
                   <ul class="order-summary">
                      <li style="margin-bottom: 7rem; text-transform: uppercase;">
                         <h2>Resumo da compra</h2>
                      </li> 
                      <li> 
                        Subtotal: 
                        <div>R$ ${(itemsPrice).toFixed(2)}</div>   
                      </li>
                      <li> 
                        Frete:
                         <div>${
                                itemsPrice > 100 ? 'Grátis' : 
                               `<p>R$ ${(shippingPrice).toFixed(2)}</p>`
                               } 
                         </div> 
                      </li>
                      <li> 
                        Imposto:
                        <div>R$ ${(taxPrice).toFixed(2)}</div>  
                      </li>

                      <li class="total"> 
                        Valor total
                        <div>R$ ${(totalPrice).toFixed(2)}</div>   
                      </li>

                      <button class="primary fw" id="placeorder-button">
                           Finalizar compra
                      </button>
                   </ul>  
                </div>
             </div>
          </div>
        `;
       }
};

export default PlaceOrderScreen;