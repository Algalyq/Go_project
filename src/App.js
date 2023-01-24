import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./pages/main";
import Shop from "./pages/shop";
import { Routes, Route, useLocation} from "react-router-dom";
import Info from "./pages/info";
import Service from "./pages/service";
import Contact from "./pages/contact";

function App() {
  let location = useLocation();
  return (
    <div className="App">
         <Header></Header>
         <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/shop' element={<Shop key={location.pathname}/>}/>      
          <Route path='/info' element={<Info key={location.pathname}/>}/>
          <Route path="/services" element={<Service key={location.pathname}/>}/>      
          <Route path="/contact" element={<Contact key={location.pathname}/>}/>      
        </Routes>
         <Footer></Footer>
    </div>
  );
}

export default App;