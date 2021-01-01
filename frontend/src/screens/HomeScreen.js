import axios from 'axios'; 



const HomeScreen = {
    render: async () => { 
        const response = await axios({
            url: 'http://localhost:5000/api/products',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response || response.statusText !== 'OK'){
            return `<div>Error in getting data</div>`;
        }
        const products =  response.data;

        return `
        <ul class="products">
            ${products.map(product => `
               <li class="product-grid">
                   <div class="product">
                    <a href="/#/product/${product._id}">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                        <div class="product-main-details">
                            <div class="product-name">
                                <a href="/#/product/1">
                                    ${product.name}
                                </a>
                            </div>
                            <div class="product-brand">
                                 ${product.brand}
                            </div>
                            <div class="product-price">
                                R$ ${product.price}
                            </div>
                        </div>
                    </div>
                </li>
            `).join('\n')}
        </ul>
        `
    }
};

export default HomeScreen;