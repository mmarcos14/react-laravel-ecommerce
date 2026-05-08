import { BrowserRouter, Routes, Route } from "react-router-dom"
import ReactDOM from "react-dom";
import { Home } from "./Pages/Home";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { ProviderContext } from "./ServiceContext/ProviderContext";
import { CategoryList } from "./Pages/Categories/CategoryList";
import { ModalProduct } from "./Pages/Products/ModalProduct";
import { ProductList } from "./Pages/Products/ProductList";
import { Catalogue } from "./Pages/Products/Catalogue";
import { NavBar } from "./Pages/NavBar";
import { ProviderCartContext } from "./ServiceContext/ProviderCartContext";

export const App=()=>{
   return(
    <BrowserRouter>
    <ProviderContext>
      <ProviderCartContext>
    <NavBar/>

      <Routes>
        <Route path="/" element={<Catalogue/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/category" element={<CategoryList/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/product" element={<ModalProduct/>}/>
        <Route path="/products" element={<ProductList/>}/>
      </Routes>
      </ProviderCartContext>
      </ProviderContext>
    </BrowserRouter>
   )
}


const root = document.getElementById("app");

if (root) {
    ReactDOM.render(<App />, root);
    
}