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

const store = configureStore();

function App() {
  let location = useLocation();
  return (
    <Provider store={store}>
    <div className="App">
         {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin' && <Header/>}
         <Routes>

            <Route path='/' element={<Main/>}/>
            <Route path='/shop' element={<Shop key={location.pathname}/>}/>      
            <Route path='/info' element={<Info key={location.pathname}/>}/>
            <Route path="/services" element={<Service key={location.pathname}/>}/>      
            <Route path="/contact" element={<Contact key={location.pathname}/>}/>  
          <Route path='/login' element={<Login key={location.pathname} />}/>    
          <Route path='/register' element={<Registration key={location.pathname} />}/> 
          <Route path="/admin" element={<FurniturePanel key={location.pathname}/>}/>  
        </Routes>
        {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin' &&  <Footer/>}
         
    </div>
    </Provider>
  );
}

export default App;
