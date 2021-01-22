import { hideLoading, showLoading, showMessage } from "../../utils";
import { getMyOrders, update } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const MyOrdersScreen = {
    after_render: () => {  
    },

    render: async() => {
        const {name, email} = getUserInfo();
        if(!name){
            document.location.hash = '/';
        }
        
        const orders = await getMyOrders();

        return `
        
              
           <div class="history-orders">
           <h2>Histórico de compras</h2>
              <table class="orders-info">
                    <thead>
                          <tr>
                              <th>ID DO PEDIDO</th>
                              <th>DATA DA COMPRA</th>
                              <th>VALOR TOTAL</th>
                              <th>PAGO</th>
                              <th>STATUS</th> 
                          </tr>
                    </thead>
                     <tbody class="table-orders"> 
                          ${
                             orders.length === 0 ?
                             `<tr><td colspan="6">Sem pedidos</td></tr>`
                             : orders.map((order) => `
                            <tr>
                                <td>${order._id}</td>
                                <td>${(order.createdAt)}</td>
                                <td>R$ ${(order.totalPrice).toFixed(2)}</td>
                                 <td class="success">Pago</td> 
                                 <td style="color:#ec8816;">À caminho</td>
                                     
                            </tr>
                            `).join('\n')} 
                     </tbody>
              </table>
           </div>
        </div>
       
        `;
    },
}


export default MyOrdersScreen;