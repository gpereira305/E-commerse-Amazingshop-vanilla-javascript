import { getUserInfo } from "../localStorage";



const Header =  {
    render: () => {
        const {name} = getUserInfo();

        return `
            <div class="brand">
                <a href="/#/">AmazonaShop</a>
            </div>
            <div>
             ${
                 name 
                 ? `<a href="/#/profile"></i>${name}</a>`
                 : `<a href="/#/signin"><i class="fas fa-user"></i> Minha conta</a>`
               } 
               <a href="/#/cart"><i class="fas fa-shopping-cart"></i> Cart</a>
            </div>
             `;
    },

    after_render: () => {

    }
};

export default Header;