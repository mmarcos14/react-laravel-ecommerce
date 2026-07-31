import { useEffect, useState } from "react";
import { useAuth } from "../../ServiceContext/ProviderServiceContext";

export const userProduct = (categoryId = null) => {
    const [products, setProduct] = useState([]);
    const [categories, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, FetchAll }=useAuth();

    const load = async () => {
        try {
            const response = await FetchAll("product");
            const resp = await FetchAll("category");
            const allproducts = response.data.nproducts;
            const allCategory = resp.data.categoriesdata;

            const filtered = categoryId
                ? allproducts.filter((p) => p.category_id === categoryId)
                : allproducts;
            setProduct(filtered);
            setCategory(allCategory);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [categoryId]);

    return {loading,products,categories}
};
