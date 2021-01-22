import {getUserInfo } from "../localStorage";


const Header = { 
  
  after_render: () => {  
    
  },

    render: () => {  
      const { name } = getUserInfo();  
    
        return `
        <div class="brand">
              <a href="/#/">ArizonaShop</a>
         </div>
            <div>
              ${
                name
                  ? `<a href="/#/profile">${name}`
                  : `<a href="/#/signin"><i class="fas fa-user"></i> Logar</a>` 
              }
              
            <a href="/#/cart"><i class="fas fa-shopping-cart"></i> Carrinho</a>
      </div>
        `;
    }
  
};

export default Header; 