import { useEffect, useState } from "react"
import { useAuth } from "../../ServiceContext/ProviderContext";
import { DataTableProduct } from "./DataTableProduct";

export const ProductList=()=>{
    const [Product,setProduct]=useState([]);
    const {FetchAll,user}=useAuth();
    const getProducts=async()=>{
        try{
            const response=await FetchAll('product');
           //console.log(response.data.nproducts)
            setProduct(response.data.nproducts)

        }catch(e){
         console.log(e)
        }
    }
    useEffect(()=>{
       getProducts();
    },[Product])
    return(
        <div className="container">
            <div className="row">
            <DataTableProduct Datas={Product} refresh={getProducts}/>
            </div>
        </div>
    )
}