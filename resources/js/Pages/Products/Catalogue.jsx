import { useEffect, useState } from "react";
import { useAuth } from "../../ServiceContext/ProviderServiceContext";
import { DataCatalogue } from "./DataCatalogue";

export const Catalogue = () => {
    const [Product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const { FetchAll } = useAuth();

    const getProducts = async () => {
        try {
            setLoading(true);

            const response = await FetchAll("product");
            setProduct(response.data.nproducts);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <DataCatalogue
                    Datas={Product}
                    loading={loading}
                    refresh={getProducts}
                />
            </div>
        </div>
    );
};
