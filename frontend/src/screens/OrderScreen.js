 
import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage} from '../../utils';
import {getOrder} from '../api'; 
import { clearCart} from '../localStorage';


 
 





 const OrderScreen = {
   after_render: async () => {

         const confirmOrder = document.getElementById('order-confirmBtn')
         confirmOrder.addEventListener('click', () => { 
               showMessage('<p style="color: #44bd32;">Pedido realizado com sucesso!</p>', () => {
                  showLoading();

                  rerender(OrderScreen);

                  clearCart();

                  document.location.hash = '/mylistorder';
                  hideLoading();
                });
         });

   },
   render: async () => {

     const request = parseRequestUrl();
     const {
       _id,
       shipping,
       payment,
       orderItems,
       itemsPrice,
       shippingPrice,
       taxPrice,
       totalPrice,
       isDelivered,
       deliveredAt,
       isPaid,
       paidAt,
       
     } = await getOrder(request.id);
   //   if (!isPaid) {
   //     addPaypalSdk(totalPrice);
   //   }
 

        return `
          <div style="width: 100%;">
          <div class="order-number">
             Pedido:  <p>${_id}</p>
          </div>

             <div class="order">
                  <div class="order-info">
                      <div class="order-header">
                         <h3 style="margin-bottom: 1rem; text-transform: uppercase;">Endereço de entrega</h3>
                         <div style="text-transform: capitalize; color: grey; font-weight: lighter;">
                             ${shipping.address} -
                             ${shipping.city} -
                             ${shipping.postalCode} -
                             ${shipping.country}
                         </div>
                          <h3 style="margin: 1rem 0; text-transform: uppercase;"> Previsão de entrega:</h3>
                          <div>
                             ${
                                isDelivered 
                                ? `<div class="success">Entregue em ${deliveredAt}</div>` 
                                : `<div class="error">A ser definido</div>` 
                               }
                          </div>
                      </div>

                      <div class="order-header">
                           <h3 style="margin-bottom: 2rem; text-transform: uppercase;">Pagamento</h3>
                           <div>
                               Forma de pagamento: ${payment.paymentMethod}
                           </div>
                           ${
                            isPaid 
                            ? `<div class="success">Pago ${paidAt}</div>` 
                            : `<div class="error">Aguardando pagamento</div>` 
                          }
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
                      <li> 
                          <button class="primary fw" id="order-confirmBtn">
                             Finalizar pedido
                          </button>
                      </li>
                   </ul>  
                </div>
             </div>
          </div>
        `;
       }
};

export default OrderScreen;