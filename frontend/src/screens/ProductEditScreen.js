import { hideLoading, parseRequestUrl, showLoading, showMessage } from '../../utils';
import { getProduct, updateProduct, uploadProductImage } from '../api';


const ProductEditScreen = {
    after_render: () =>{
        const request = parseRequestUrl();

        document.getElementById('edit-product-form')
        .addEventListener('submit', async(e) => {
            e.preventDefault();

            showLoading();
            const data = await updateProduct({
                _id: request.id,
                name: document.getElementById('name').value,
                price: document.getElementById('price').value,
                image: document.getElementById('image').value,
                brand: document.getElementById('brand').value,
                category: document.getElementById('category').value,
                countInStock: document.getElementById('countInStock').value,
                description: document.getElementById('description').value,
            });
            hideLoading();

            if(data.error){
                showMessage(data.error);

            }else{
                document.location.hash = '/productlist';
            }
        });

        document.getElementById('image-file')
        .addEventListener('change', async(e) => {

            const file = e.target.files[0];
            const formData = new FormData();
            
            formData.append('image', file);
            showLoading();

            const data = await uploadProductImage(formData);
            hideLoading();

            if(data.error){
                showMessage(data.error)

            }else{
                showMessage('<p style="color: green;">Upload feito com sucesso!</p>');
                document.getElementById('image').value = data.image;
            }
        });
    }, 

    render: async() =>{
        const request = parseRequestUrl();
        const product = await getProduct(request.id);

        return `

          <div class="product-edit-page">
            <div class="goto-products">
               <i class="fas fa-chevron-left"></i>
                <a href="/#/productlist">Voltar aos produtos</a>
            </div>
        
            <div class="content">
               <div class="form-container">
                  <form id="edit-product-form">
                      <ul class="form-items">
                         <li class="edit-header">
                            <h1>Editar produto</h1>
                            <h3>ID: ${product._id.substring(0, 25)}</h3>
                         </li>
                         <li>
                            <label for="name">Nome</label>
                            <input
                                type="text"
                                name="name"
                                value="${product.name}"
                                id="name"
                            />
                         </li>
                         <li>
                            <label for="price">Preço</label>
                            <input
                                type="number"
                                name="price"
                                value="${product.price}"
                                id="price"
                            />
                         </li>
                         <li>
                            <label for="image">Imagem (680 x 830)</label>
                            <input
                                type="text"
                                name="image"
                                value="${product.image}"
                                id="image"
                            />
                            <input
                                type="file"
                                name="image-file" 
                                id="image-file"
                            /> 
                         </li>
                         <li>
                            <label for="brand">Marca</label>
                            <input
                                type="text"
                                name="brand"
                                value="${product.brand}"
                                id="brand"
                            />
                         </li>
                         <li>
                            <label for="countInStock">Qtd. em Estoque</label>
                            <input
                                type="text"
                                name="countInStock"
                                value="${product.countInStock}"
                                id="countInStock"
                            />
                         </li>
                         <li>
                            <label for="category">Categoria</label>
                            <input
                                type="text"
                                name="category"
                                value="${product.category}"
                                id="category"
                            />
                         </li>
                         <li>
                            <label for="description">Descrição</label>
                            <input
                                type="text"
                                name="description"
                                value="${product.description}"
                                id="description"
                            />
                         </li>
                         <li> 
                            <button type="submit" class="primary">Atualizar</button>
                         </li>
                      </ul>
                  </form>
               </div>
            </div>
       </div>
        `;
    },
};


export default ProductEditScreen;