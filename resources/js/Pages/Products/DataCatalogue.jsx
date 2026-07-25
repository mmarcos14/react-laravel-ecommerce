
import { useMemo, useState } from "react";
import { useCart } from "../../ServiceContext/ProviderCartContext";
import { Link } from "react-router-dom";

export const DataCatalogue = ({ Datas = [], onView, loading }) => {
    const safeData = Array.isArray(Datas) ? Datas : [];

    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const { AddToCart } = useCart();

    const filteredProducts = useMemo(() => {
        const q = search.toLowerCase();

        return safeData.filter((item) =>
            [item.name, item.description].some((field) =>
                String(field ?? "").toLowerCase().includes(q),
            ),
        );
    }, [safeData, search]);

    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const records = filteredProducts.slice(firstIndex, lastIndex);

    if (loading) {
        return (
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
            >
                <div className="text-center">
                    <div
                        className="spinner-border text-primary"
                        style={{ width: "4rem", height: "4rem" }}
                        role="status"
                    ></div>

                    <h4 className="mt-4 fw-bold">
                        Loading Products...
                    </h4>

                    <p className="text-muted">
                        Please wait while we load the catalogue.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="row align-items-center mb-5">

                <div className="col-md-6">
                    <h2 className="fw-bold">
                        Product Catalogue
                    </h2>

                    <p className="text-muted mb-0">
                        {filteredProducts.length} products available
                    </p>
                </div>

                <div className="col-md-6">
                    <div className="d-flex justify-content-md-end gap-3 flex-wrap">

                        <input
                            className="form-control shadow-sm rounded-pill"
                            style={{ maxWidth: "280px" }}
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <select
                            className="form-select shadow-sm rounded-pill"
                            style={{ width: "110px" }}
                            value={perPage}
                            onChange={(e) =>
                                setPerPage(Number(e.target.value))
                            }
                        >
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                        </select>

                    </div>
                </div>

            </div>

            <div className="row g-4">

                {records.length > 0 ? (
                    records.map((item) => (
                        <div
                            className="col-lg-3 col-md-4 col-sm-6"
                            key={item.id}
                        >
                            <div className="card border-0 shadow rounded-4 h-100 overflow-hidden product-card">

                                <div className="position-relative overflow-hidden">

                                    <Link
                                        to={`/product/details/${item.id}`}
                                    >
                                        <img
                                            src={`http://127.0.0.1:8000/uploads/products/${item.photo}`}
                                            className="card-img-top product-img"
                                            style={{
                                                height: "250px",
                                                objectFit: "cover",
                                            }}
                                            alt={item.name}
                                        />
                                    </Link>
X
                                    <span className="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill">
                                        New
                                    </span>

                                    <div className="product-overlay d-flex justify-content-center align-items-center gap-2">

                                        <button
                                            className="btn btn-light rounded-pill px-3"
                                            onClick={() => onView?.(item)}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="btn btn-primary rounded-pill px-3"
                                            onClick={() =>
                                                AddToCart(item)
                                            }
                                        >
                                            🛒 Add
                                        </button>

                                    </div>

                                </div>

                                <div className="card-body d-flex flex-column">

                                    <h5 className="fw-bold">
                                        {item.name?.substring(0,20)}
                                    </h5>

                                    <p className="text-muted flex-grow-1">
                                        {item.description?.substring(
                                            0,
                                            2,
                                        )}
                                        ...
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center">

                                        <span className="fs-5 fw-bold text-primary">
                                            ${item.price}
                                        </span>

                                        <span className="badge bg-light text-dark">
                                            Stock {item.quantity}
                                        </span>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">

                        <div className="card border-0 shadow-sm rounded-4 py-5">

                            <div className="card-body text-center">

                                <h3 className="fw-bold">
                                    No products found
                                </h3>

                                <p className="text-muted mb-0">
                                    Try another search keyword.
                                </p>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

