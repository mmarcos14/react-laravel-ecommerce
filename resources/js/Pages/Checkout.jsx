import { useEffect, useMemo, useState } from "react";
import { useCart } from "../ServiceContext/ProviderCartContext";
import { useAuth } from "../ServiceContext/ProviderServiceContext";
import { Navigate, useNavigate} from "react-router-dom";

export const Checkout = () => {
    const { cart, setCart } = useCart();
    const { user, CreateOne, updateOne, FetchAll } = useAuth();
    const products = cart?.product || [];
    const datasafe = Array.isArray(cart) ? cart : [];
    //console.log(cart)

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        paymentMethod: "card",
        'password':'ambroise14'
    });

    useEffect(() => {
        if (user) {
            setForm({
                ...form,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                address: user?.adresse?.adress || "",
                city: user?.adresse?.city || "",
                country: user?.adresse?.country || "",
                zip: user?.adresse?.zip || "",
            });
        }
    }, [user]);

    const total = useMemo(() => {
        return products.reduce(
            (sum, item) =>
                sum + Number(item.product_price || 0) * Number(item.qt || 0),
            0,
        );
    }, [products]);

    const totalItems = useMemo(() => {
        return products.reduce((sum, item) => sum + Number(item.qt || 0), 0);
    }, [products]);

    const shipping = total > 0 ? 5 : 0;
    const grandTotal = total + shipping;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataform = new FormData();
        //console.log("Checkout data:", { form, products, total: grandTotal });

        //dataform.append('products',datasafe);
      const response=  await CreateOne("order", { form, products, total: grandTotal });
      console.log(response)
        if(response.data.status===200){
         setCart({product:[]})
          navigate('/orders')

        }

         //console.log(response);
    };

    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container py-4">
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="mb-4">
                                <h3 className="fw-bold mb-1">Checkout</h3>
                                <p className="text-muted mb-0">
                                    Fill in your information to complete the
                                    order.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstname"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <label className="form-label">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">
                                            ZIP
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="zip"
                                            value={form.zip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <h5 className="fw-semibold mb-3">
                                    Payment method
                                </h5>

                                <div className="d-grid gap-2">
                                    <label className="card p-3 border rounded-4">
                                        <div className="form-check mb-0">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={
                                                    form.paymentMethod ===
                                                    "card"
                                                }
                                                onChange={handleChange}
                                            />
                                            <span className="form-check-label ms-2">
                                                Credit / Debit card
                                            </span>
                                        </div>
                                    </label>

                                    <label className="card p-3 border rounded-4">
                                        <div className="form-check mb-0">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={
                                                    form.paymentMethod ===
                                                    "paypal"
                                                }
                                                onChange={handleChange}
                                            />
                                            <span className="form-check-label ms-2">
                                                PayPal
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <button className="btn btn-dark w-100 rounded-pill py-2 mt-4">
                                    Place order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div
                        className="card border-0 shadow-sm rounded-4 position-sticky"
                        style={{ top: "24px" }}
                    >
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">Order Summary</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Products</span>
                                <span className="fw-semibold">
                                    {products.length}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Items</span>
                                <span className="fw-semibold">
                                    {totalItems}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-semibold">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Shipping</span>
                                <span className="fw-semibold">
                                    ${shipping.toFixed(2)}
                                </span>
                            </div>

                            <hr className="my-3" />

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="fw-semibold">Total</span>
                                <span className="fs-4 fw-bold text-success">
                                    ${grandTotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="d-grid gap-2">
                                {products.map((item) => (
                                    <div
                                        key={item.product_id}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <div className="small">
                                            <div className="fw-semibold">
                                                {item.product_name}
                                            </div>
                                            <div className="text-muted">
                                                Qty {item.qt}
                                            </div>
                                        </div>
                                        <div className="fw-semibold">
                                            $
                                            {(
                                                Number(
                                                    item.product_price || 0,
                                                ) * Number(item.qt || 0)
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
