import About from "../components/about";
import Product from "../components/product";
import arrow from '../images/arrow.svg';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useEffect, useState, useContext } from 'react';
import { filterProducts } from "../store/actions/filterAction";
import axios from "axios";
import { BASE_URL2 } from "../config/baseurl2";
import DataContext from "../components/datacontext";
import { useNavigate } from "react-router";


function Shop({filterAction, products}){
      
    const [lowprice, setLowPrice] = useState(0)
    const [highprice, setHighPrice] = useState(0)
    const [datas, setData] = useState({data: []})
    const product = useContext(DataContext);
    function onChangeLow(e){
         setLowPrice(e.target.value)
    }

    function onChangeHigh(e){
        setHighPrice(e.target.value)
    }
    
    useEffect(()=>{
         setData(products)
    }, [products])

    console.log(datas);
    useEffect(() =>{
        if(lowprice>=0 && highprice>0){
            axios.get(
                `${BASE_URL2}/products/filter/?price__lte=${lowprice}&price__gte=${highprice}`,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
              ).then(response => {
                const data = response.data;
                setData(data);
                console.log(data); // log the data to check if it's being fetched correctly
              }).catch(error => {
                console.error(error)
              });
        }else{
            filterAction({
                price__lte: 0,
                price__gte: 0
            })
            setData(products)
        }
    }, [lowprice, highprice])

  
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
                            $ <input type="number" name="from" onChange={onChangeLow} placeholder="From" />
                            <input type="number" name="to" onChange={onChangeHigh} placeholder="To" />
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
                  datas && datas.length>0  && datas.map((item, index) => {
                    return(
                        // <img src={"http://localhost:8000"+item.images[0].image}/>
                            <Product name={item.producttitle} img={item.images[0].image} price={item.price} id={item.images[0].id}></Product>
                        )
                    })
                  }
		      	</div>
		    </div>
		</div>
        </main>
    )
}

const mapDispatchToProps = dispatch => ({
    filterAction: bindActionCreators(filterProducts, dispatch),
  })
  
  const mapStateToProps = state => ({
    products: state.filterReducers.products
  })
  export default connect(mapStateToProps ,mapDispatchToProps)(Shop);
  