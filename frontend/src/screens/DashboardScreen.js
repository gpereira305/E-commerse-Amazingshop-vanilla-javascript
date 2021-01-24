import { getSummary } from '../api';
import DashboardMenu from '../components/DashBoardMenu'; 




let summary = {};
const DashBoardScreen = {

    after_render: () => {},

    render: async() => {
        summary = await getSummary();

        return `
          <div class="dashboard">
               ${DashboardMenu.render({selected: 'dashboard'})}

               <div class="dashboard-content">
                   <h1>Painel admin</h1>
                   <ul class="summary-items">

                       <li>
                         <div class="summary-title color1">
                             <span>
                                  <i class="fa fa-users"> Clientes</i>
                             </span>
                         </div>
                        <div class="summary-body">${summary.users[0].numUsers}</div>
                       </li>

                       <li>
                         <div class="summary-title color2">
                             <span>
                                  <i class="fa fa-shopping-basket"> Pedidos</i>
                             </span>
                         </div>
                        <div class="summary-body">${summary.orders[0].numOrders}</div>
                       </li>

                       <li>
                         <div class="summary-title color3">
                             <span>
                                  <i class="fa fa-money-bill-alt"> Vendas</i>
                             </span>
                         </div>
                        <div class="summary-body">${summary.orders[0].totalSales.toFixed(2)}</div>
                       </li>

                   </ul>   
               </div>
          </div>
        `;

    },
};

export default DashBoardScreen;