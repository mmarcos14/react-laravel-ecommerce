
import { useParams } from "react-router-dom";
import { useAuth } from "../../ServiceContext/ProviderServiceContext";
import { useEffect, useState } from "react";
import { useCart } from "../../ServiceContext/ProviderCartContext";

export const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [changeimage, setImage] = useState(null);

    const { OneDetails } = useAuth();
    const { AddToCart } = useCart();
    const { id } = useParams();

    useEffect(() => {
        getProduct();
    }, [id]);

    const getProduct = async () => {
        if (id) {
            const response = await OneDetails("product", id);
            setProduct(response.data.prod);
        }
    };

    const image = product?.images?.at(0);

    const getsrc = (m) => {
        setImage(m);
    };

    const final = changeimage ? changeimage : image?.name;

    return (
        <div className="container py-5">

            <div className="row g-5">

                <div className="col-lg-6">

                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                        <div className="card-body p-4">

                            <div className="product-image-box mb-4">

                                <img
                                    src={`http://127.0.0.1:8000/uploads/products/${final}`}
                                    alt={product?.name}
                                    className="product-image"
                                />

                            </div>

                            <div className="d-flex justify-content-center gap-3 flex-wrap">

                                {product?.images?.map((item) => (
                                    <img
                                        key={item.id}
                                        src={`http://127.0.0.1:8000/uploads/products/${item.name}`}
                                        alt={item.name}
                                        onClick={() => getsrc(item.name)}
                                        style={{
                                            width: "85px",
                                            height: "85px",
                                            objectFit: "cover",
                                            borderRadius: "12px",
                                            cursor: "pointer",
                                            border:
                                                final === item.name
                                                    ? "3px solid #0d6efd"
                                                    : "2px solid #dee2e6",
                                            transition: ".3s",
                                        }}
                                    />
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card border-0 shadow-lg rounded-4 h-100">

                        <div className="card-body p-5">

                            <span className="badge bg-success px-3 py-2 rounded-pill mb-3">
                                In Stock
                            </span>

                            <h2 className="fw-bold mb-3">
                                {product?.name}
                            </h2>

                            <h1 className="text-primary fw-bold mb-4">
                                ${product?.price}
                            </h1>

                            <hr />

                            <h4 className="fw-bold mt-4 mb-3">
                                Product Description
                            </h4>

                            <p
                                className="text-muted"
                                style={{
                                    lineHeight: "30px",
                                    textAlign: "justify",
                                }}
                            >
                                {product?.description}
                            </p>

                            <div className="row text-center my-5">

                                <div className="col-4">
                                    <div className="border rounded-4 py-3">
                                        <h5 className="fw-bold mb-1">
                                            ✓
                                        </h5>
                                        <small>Quality</small>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="border rounded-4 py-3">
                                        <h5 className="fw-bold mb-1">
                                            🚚
                                        </h5>
                                        <small>Fast Delivery</small>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="border rounded-4 py-3">
                                        <h5 className="fw-bold mb-1">
                                            🔒
                                        </h5>
                                        <small>Secure</small>
                                    </div>
                                </div>

                            </div>

                            <div className="d-grid gap-3">

                                <button
                                    className="btn btn-primary btn-lg rounded-pill"
                                    onClick={() => AddToCart(product)}
                                >
                                    🛒 Add To Cart
                                </button>

                                <button className="btn btn-outline-dark btn-lg rounded-pill">
                                    Buy Now
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

