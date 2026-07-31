import { useState } from "react";
import { userProduct } from "./DataProductListJson";

export const CategoryProductCatalogue = () => {
    const [categoryId, setCategoryId] = useState(null);
    const { loading, products, categories } = userProduct(categoryId);

    return (
        <div className="container-fluid mt-5">
            <div className="row g-4">

                {/* CATEGORIES */}
                <div className="col-lg-2">
                    <div
                        className="card border-0 shadow-sm rounded-4 position-sticky"
                        style={{ top: "24px" }}
                    >
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">Category product</h5>

                            <ul className="list-group">

                                {/* ALL */}
                                <button
                                    className={`list-group-item ${categoryId === null ? "active" : ""}`}
                                    onClick={() => setCategoryId(null)}
                                >
                                    All
                                </button>

                                {/* CATEGORIES */}
                                {categories?.map((c) => (
                                    <button
                                        key={c.id}
                                        className={`list-group-item fw-bold ${c.id === categoryId ? "active" : ""}`}
                                        onClick={() => setCategoryId(c.id)}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* PRODUCTS */}
                <div className="col-lg-10">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-md-5">

                            <h4 className="fw-bold mb-4">Products</h4>

                            {/* SI 6 PRODUITS OU MOINS → GRILLE NORMALE */}
                            {products.length <= 5 && (
                                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                                    {products.map((p) => (
                                        <div className="col" key={p.id}>
                                            <div className="product-item">
                                                <img
                                                    src={`http://127.0.0.1:8000/uploads/products/${p.photo}`}
                                                    alt={p.name.substring(0.10)}
                                                    className="product-img"
                                                />
                                                <div className="product-info">
                                                    <p className="product-name">{p.name.substring(0,10)}</p>
                                                    <p className="product-price">${p.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* SI PLUS DE 6 PRODUITS → SLIDER MULTI-LIGNES */}
                            {products.length > 4 && (
                                <div className="product-slider">
                                    <div className="product-grid">
                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                                            {products.map((p) => (
                                                <div className="col" key={p.id}>
                                                    <div className="product-item">
                                                        <img
                                                            src={`http://127.0.0.1:8000/uploads/products/${p.photo}`}
                                                            alt={p.name.substring(0,10)}
                                                            className="product-img"
                                                        />
                                                        <div className="product-info">
                                                            <p className="product-name">{p.name.substring(0,10)}</p>
                                                            <p className="product-price">${p.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
