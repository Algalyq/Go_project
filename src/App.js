import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./pages/main";
import Shop from "./pages/shop";
import { Routes, Route, useLocation} from "react-router-dom";
import Info from "./pages/info";
import Service from "./pages/service";
import Contact from "./pages/contact";
import Login from "./components/login";
import Registration from "./components/registration";
import {Provider} from 'react-redux'
import configureStore from './store';
import FurniturePanel from "./admin/furniturePanel";
import Admin from "./admin";
import Review from "./pages/review";
import { useState, useEffect } from "react";
import { BASE_URL2 } from "./config/baseurl2";
import axios from "axios";
import DataContext from "./components/datacontext";
import Cart from "./pages/cart";

const store = configureStore();

function App() {
  let location = useLocation();
  const [product, setProduct] = useState({data: []})

  useEffect(()=>{
    function showProducts(){
      console.log(localStorage.getItem('token'));
      axios.get(
        `${BASE_URL2}/products/filter/`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
      ).then(response => {
        const data = response.data;
        setProduct(data);
        console.log(data); // log the data to check if it's being fetched correctly
      }).catch(error => {
        console.error(error)
      });
    }
    
    showProducts();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    if (token && new Date(expiryDate) <= new Date()) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiryDate');
    }
  }, []);

  return (
    <DataContext.Provider value={product}>
    <Provider store={store}>
      
    <div className="App">
         {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin'  && location.pathname !== '/admin/furniture'  && <Header/>}
         <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/shop' element={<Shop key={location.pathname}/>}/>      
            <Route path='/info' element={<Info key={location.pathname}/>}/>
            <Route path="/services" element={<Service key={location.pathname}/>}/>      
            <Route path="/contact" element={<Contact key={location.pathname}/>}/>  
            <Route path='/login' element={<Login key={location.pathname} />}/>    
            <Route path='/register' element={<Registration key={location.pathname} />}/> 
            <Route path='/cart' element={<Cart key={location.pathname} />} />
          <Route path='admin' element={<Admin/>}>
            <Route path='' element={<FurniturePanel/>} />
            <Route path='furniture' element={<FurniturePanel />}/>
          </Route>
          <Route path="/review/:id" element={<Review key={location.pathname} queryname="product_id"/>}/>
        </Routes>
        {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin'  && location.pathname !== '/admin/furniture' &&  <Footer/>}
         
    </div>
    </Provider>
    </DataContext.Provider>
  );
}

export default App;
