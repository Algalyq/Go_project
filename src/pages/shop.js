import About from "../components/about";
import Product from "../components/product";
import product1 from '../images/product-1.png';
import product2 from '../images/product-2.png';
import product3 from '../images/product-3.png';
import arrow from '../images/arrow.svg';

export default function Shop(){
    return(
        <main>
            <About text="Shop"></About>
            <div class="untree_co-section product-section before-footer-section">
		    <div class="container shop">
                <div className="filter">
                    <h1>Filter By</h1>
                    <div className="filter-item filter_price">
                        <span className="filter-show">
                            Price <img src={arrow} alt="Arrow"/>
                        </span>
                        <span className="filter-input input-price">
                            $ <input type="number" name="from" placeholder="From" />
                            <input type="number" name="to" placeholder="To" />
                        </span>
                    </div>
                    <div className="filter-item filter_material">
                        <span className="filter-show">
                            Material <img src={arrow} alt="Arrow"/>
                        </span>
                        <span className="filter-input">
                           <label for="metal"> <input type="checkbox" name="metal" id="metal"/>Metal</label>
                           <label for="wood"> <input type="checkbox" name="wood" id="wood"/>Wooden</label>
                        </span>
                    </div>
                    <div className="filter-item filter_product">
                        <span className="filter-show">
                            Product <img src={arrow} alt="Arrow"/>
                        </span>
                        <span className="filter-input">
                           <label for="chair"> <input type="checkbox" name="chair" id="chair"/>Chair</label>
                           <label for="bedroom"> <input type="checkbox" name="bedroom" id="bedroom"/>Bedroom</label>
                        </span>
                    </div>
                    <div className="filter-item filter_brand">
                        <span className="filter-show">
                            Brand <img src={arrow} alt="Arrow"/>
                        </span>
                        <span className="filter-input">
                           <label for="ikea"> <input type="checkbox" name="ikea" id="ikea"/>Ikea</label>
                           <label for="furni"> <input type="checkbox" name="furni" id="furni"/>Furni</label>
                        </span>
                    </div>
                    <div className="filter-item filter_availability">
                        <span className="filter-show">
                            Availability <img src={arrow} alt="Arrow"/>
                        </span>
                        <span className="filter-input">
                           <label for="instock"> <input type="checkbox" name="instock" id="instock"/>in stock(2)</label>
                           <label for="outofstock"> <input type="checkbox" name="outofstock" id="outofstock"/>out of stock</label>
                        </span>    
                    </div>
                </div>
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