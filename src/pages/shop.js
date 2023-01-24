import About from "../components/about";
import Product from "../components/product";
import product1 from '../images/product-1.png';
import product2 from '../images/product-2.png';
import product3 from '../images/product-3.png';

export default function Shop(){
    return(
        <main>
            <About text="Shop"></About>
            <div class="untree_co-section product-section before-footer-section">
		    <div class="container">
		      	<div class="row">
                {
                  [{name:"Nordic Chair", img: product1, price: "50.00"}, {name:"Kruzo Aero Chair", img: product2, price: "78.00"}, 
                        {name:"Ergonomic Chair", img: product3, price: "48.00"}, {name:"Nordic Chair", img: product1, price: "50.00"}, 
                        {name:"Nordic Chair", img: product1, price: "50.00"}, 
                        {name:"Kruzo Aero Chair", img: product2, price: "78.00"}, 
                        {name:"Ergonomic Chair", img: product3, price: "48.00"}, {name:"Nordic Chair", img: product1, price: "50.00"}].map((item, index) => (
                            <Product name={item.name} img={item.img} price={item.price}></Product>
                        ))
                }
		      	</div>
		    </div>
		</div>
        </main>
    )
}