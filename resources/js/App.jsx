import { BrowserRouter, Routes, Route } from "react-router-dom"
//import "bootswatch/dist/lux/bootstrap.min.css"; 
import ReactDOM from "react-dom";
import { Home } from "./Pages/Home";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { CategoryList } from "./Pages/Categories/CategoryList";
import { ModalProduct } from "./Pages/Products/ModalProduct";
import { ProductList } from "./Pages/Products/ProductList";
import { Catalogue } from "./Pages/Products/Catalogue";
import { NavBar } from "./Pages/NavBar";
import { ProviderCartContext } from "./ServiceContext/ProviderCartContext";
import { CartPage } from "./Pages/CartPage";
import { Checkout } from "./Pages/Checkout";
import { ProviderServiceContext } from "./ServiceContext/ProviderServiceContext";
import { OrdersList } from "./Pages/UserOrders";
import { ProductDetails } from "./Pages/Products/ProductDetails";
import { CategoryProductCatalogue } from "./Pages/Products/CategoryProductCatalogue";
import "../css/app.css";
export const App=()=>{
   return(
    <BrowserRouter>
    <ProviderServiceContext>
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
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/shop" element={<Catalogue/>}/>
       <Route path="/checkout" element={<Checkout/>}/>
       <Route path="/orders" element={<OrdersList/>}/>
       <Route path="/product/details/:id" element={<ProductDetails/>}/>
       <Route path="/c" element={<CategoryProductCatalogue/>}/>


       
      </Routes>
      </ProviderCartContext>
      </ProviderServiceContext>
    </BrowserRouter>
   )
}


const root = document.getElementById("app");

if (root) {
    ReactDOM.render(<App />, root);
    
}