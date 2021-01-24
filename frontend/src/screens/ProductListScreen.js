 
import { createProduct, deleteProduct, getProducts } from '../api';
import DashboardMenu from '../components/DashBoardMenu';
import {showLoading, hideLoading, rerender, showMessage} from '../../utils';


const ProductListScreen = {
    after_render:  () => {
        // create products
        document.getElementById('create-product-button')
        .addEventListener('click', async() => {

            const data = await createProduct();
            document.location.hash = `/product/${data.product._id}/edit`;
        });

        // edit products
        const editButtons = document.getElementsByClassName('edit-button')
        Array.from(editButtons).map(((editButton) => {

            editButton.addEventListener('click', () => {
                document.location.hash = `/product/${editButton.id}/edit`;
            });
        }));

         // delete products
        const deleteButtons = document.getElementsByClassName('delete-button') 
        Array.from(deleteButtons).map((deleteButton) => {

            deleteButton.addEventListener('click', async() => {
                if(confirm('Tem certeza que quer deletar esse produto?')){
                    showLoading();

                    const data = await deleteProduct(deleteButton.id);
                    if(data.error){
                        showMessage(data.error);

                    }else{
                        rerender(ProductListScreen);
                    }
                    hideLoading();
                   
                }
            });
        });
    },

    render: async() => {
        const products = await  getProducts();
        return `
        <div class="dashboard">
             ${DashboardMenu.render({selected: 'products'})}

             <div class="dashboard-content">
               <div class="dashboard-header">
                    <h1>Produtos</h1>
                    <button id="create-product-button" class="primary">
                            Cadastrar produto
                    </button>
               </div>
                    <div class="product-list">
                        <table>
                              <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOME PRODUTO</th>
                                        <th>PREÇO</th>
                                        <th>CATEGORIA</th>
                                        <th>MARCA</th>
                                        <th>AÇÃO</th>
                                    </tr>
                              </thead>

                               <tbody>
                                   ${
                                      products.map((product) =>`
                                    <tr>
                                       <td>${product._id}</td>
                                       <td>${product.name}</td>
                                       <td>R$ ${product.price}</td>
                                       <td>${product.category}</td>
                                       <td>${product.brand}</td>
                                       <td style="display: flex;">
                                          <button id="${product._id}" class="edit-button">Editar</button>
                                          <button id="${product._id}" class="delete-button">Deletar</button>
                                       </td>
                                    </tr>  
                                      
                                 `).join('\n')}
                               </tbody>
                        </table>
                    </div>
                 <div>
                     <p>Info here</p>
                 </div>                
             </div>
        </div>
      `;

    },
    
};

export default ProductListScreen;


