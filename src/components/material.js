import Product from "./product";
import product1 from '../images/product-1.png';
import product2 from '../images/product-2.png';
import product3 from '../images/product-3.png';


export default function Material(){
    return(
        <div className="product-section">
            <div class="container">
				<div class="row">

					<div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 class="mb-4 section-title">Crafted with excellent material.</h2>
						<p class="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
						<p><a href="shop.html" class="btn">Explore</a></p>
					</div> 
                    {
                        [{name:"Nordic Chair", img: product1, price: "50.00"}, {name:"Kruzo Aero Chair", img: product2, price: "78.00"}, 
                        {name:"Ergonomic Chair", img: product3, price: "48.00"}].map((item, index) => (
                            <Product name={item.name} img={item.img} price={item.price}></Product>
                        ))
                    }
				</div>
			</div>
        </div>
    )
}