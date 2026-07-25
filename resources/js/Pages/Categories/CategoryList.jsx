import { useEffect, useState } from "react"
import { DataTableCategory } from "./DataTableCategory"
import { useAuth } from "../../ServiceContext/ProviderServiceContext";

export const CategoryList=()=>{
    const [Categories,setCategory]=useState([]);
    const {FetchAll,user}=useAuth();
    const getCategories=async()=>{
        try{
            const response=await FetchAll('category');
           // console.log(response.data.categoriesdata)
            setCategory(response.data.categoriesdata)

        }catch(e){
         console.log(e)
        }
    }
    useEffect(()=>{
       getCategories();
    },[])
    return(
        <div className="container">
            <div className="row">
                <DataTableCategory Datas={Categories} refresh={getCategories} />
            </div>
        </div>
    )
}