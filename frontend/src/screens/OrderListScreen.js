 
import {deleteOrder, getOrders } from '../api';
import DashboardMenu from '../components/DashBoardMenu';
import {showLoading, hideLoading, rerender, showMessage} from '../../utils';


const OrderListScreen = {
    after_render:  () => { 
         // delete orders
        const deleteButtons = document.getElementsByClassName('delete-button') 
        Array.from(deleteButtons).map((deleteButton) => {

            deleteButton.addEventListener('click', async() => {
                if(confirm('Tem certeza que quer deletar esse produto?')){
                    showLoading();

                    const data = await deleteOrder(deleteButton.id);
                    if(data.error){
                        showMessage(data.error);

                    }else{
                        rerender(OrderListScreen);
                    }
                    hideLoading();
                   
                }
            });
        });
    },

    render: async() => {
        const orders = await  getOrders();
        return `
        <div class="dashboard">
             ${DashboardMenu.render({selected: 'orders'})}
             
             <div class="dashboard-content">
             <div class="dashboard-header">
                  <h1 style="text-align: center;">Relatório de pedidos</h1> 
             </div>
                  <div class="order-list">
                      <table>
                            <thead>
                                  <tr>
                                      <th>ID DO PEDIDO</th>
                                      <th>DATA</th>
                                      <th>PREÇO TOTAL</th>
                                      <th>CLIENTE</th>
                                      <th>STATUS</th>
                                      <th>ENVIO</th>
                                      <th>AÇÃO</th> 
                                  </tr>
                            </thead>

                             <tbody>
                                 ${
                                    orders.map((order) =>`
                                  <tr>
                                     <td>${order._id}</td>
                                     <td>${order.createdAt}</td>
                                     <td>R$ ${order.totalPrice.toFixed(2)}</td>
                                     <td>${order.user.name}</td>
                                     <td style="color: #44bd32;">${order.paidAt || 'Pago'}</td>
                                     <td style="color:#ec8816;">${order.deliveredAt || 'Despachado'}</td>
                                     <td style="display: flex;"> 
                                        <button id="${order._id}" class="delete-button">Deletar</button>
                                     </td>
                                  </tr>  
                                    
                               `).join('\n')}
                             </tbody>
                      </table>
                  </div>
               <div>
                
               </div>                
           </div> 


        </div>
      `;

    },
    
};

export default OrderListScreen;


