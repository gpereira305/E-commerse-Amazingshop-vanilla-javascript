import HomeScreen from "./screens/HomeScreen";
import { parseRequestUrl } from "../utils";
import Error404Screen from "./screens/Error404Screen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";



const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
};


const router = async() => {
    const request = parseRequestUrl();
    const parseUrl =
     (request.resource ?  `/${request.resource}` : '/') +
     (request.id ? '/:id' : '') + 
     (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
        
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);