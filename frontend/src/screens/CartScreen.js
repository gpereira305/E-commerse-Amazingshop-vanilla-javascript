import {parseRequestUrl, rerender} from '../utils';
import {getProduct} from '../api';
import { getCartItems, setCartItems } from '../localStorage';


const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if(existItem){
    if(forceUpdate){
      cartItems = cartItems.map((x) => x.product === existItem.product ?  item : x );

    }
  }else{
    cartItems = [...cartItems, item];

  } 
  setCartItems(cartItems);

  if(forceUpdate){
    rerender(CartScreen);

  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if(id === parseRequestUrl().id){
    document.location.hash = '/cart';

  }else{
    rerender(CartScreen);
  }
}

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({...item, qty: Number(e.target.value)}, true);
      });
    });

    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeFromCart(deleteButton.id);
      });
    });
    document.getElementById('checkout-button')
     .addEventListener('click', () => {
        document.location.hash = '/signin';
     });
  },

  render: async () => {
    const request = parseRequestUrl();
    if(request.id){
      const product = await getProduct(request.id);

      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }

    const cartItems = getCartItems();
      return  `
      <div class="back-to-result">
          <a href="/#/">
            <h3 style="margin-bottom: 1rem;">
                <i class="fas fa-arrow-left"></i> 
                Voltar
            </h3>
          </a>
      </div>
          <div class="cart">
             <div class="cart-list">
                <ul class="cart-list-container">
                   <li>
                      <h3>Shopping Cart</h3>
                      <div>Preço da unidade</div>
                   </li>
                   ${
                     cartItems.length === 0 ?
                     '<div><h2><a href=""/#/>Carrinho vazio</a></h2></div>' :
                      cartItems.map(item => `
                         <li>
                            <div class="cart-image">
                                <img src="${item.image}" alt="${item.name}"/>
                            </div>

                            <div class="cart-name">
                                <div>
                                   <a href="/#/product/${item.product}">
                                      ${item.name}
                                   </a>
                                </div>

                                <div>
                                   Quantidade:
                                   <select class="qty-select" id="${item.product}">
                                       ${
                                         [...Array(item.countInStock).keys()].map((x) =>
                                         item.qty === x + 1  ? `<option selected value="
                                          ${x + 1}">${x + 1}</option>` :  `<option value="
                                          ${x + 1}">${x + 1}</option>`
                                        )}
                                   </select>
                                   <button type="button"
                                      class="delete-button"
                                      id="${item.product}">
                                      Deletar
                                   </button>
                                </div>
                            </div>

                            <div class="cart-price">
                              R$ ${item.price}
                            </div>
                         </li>
                      `).join('\n')}
                </ul>
             </div>

             <div class="cart-action">
               <h3 style="margin-bottom: 1rem;">
                  Total de itens:
                  ${cartItems.reduce((a, c) => 
                    a + c.qty, 0)}
                </h3>
                  <h2>
                    Total à vista:<br>
                    R$ ${cartItems.reduce((a, c) => 
                    a + c.price * c.qty, 0).toFixed(2)}
                  </h2>
               
               <button id="checkout-button" class="fw primary">
                  Ir para checkout 
               </button>
             </div>
          </div>
      `;

  }
};

export default CartScreen;