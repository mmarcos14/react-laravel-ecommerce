import { useMemo, useState, useEffect } from "react";
import { useCart } from "../ServiceContext/ProviderCartContext";
import { useAuth } from "../ServiceContext/ProviderServiceContext";
import { Navigate, useNavigate } from "react-router-dom";

import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

export const Checkout = () => {
    const { cart, setCart } = useCart();
    const { user, CreateOne, updateOne, FetchAll ,loading} = useAuth();
    const products = cart?.product || [];
    const datasafe = Array.isArray(cart) ? cart : [];
    //console.log(cart)


    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

  

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        paymentMethod: "card",
        password: "ambroise14",
    });

    useEffect(() => {
        if (user) {
            setForm({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: user?.adresse?.adress || "",
                city: user?.adresse?.city || "",
                country: user?.adresse?.country || "",
                zip: user?.adresse?.zip || "",
                paymentMethod: "card",
                password: "ambroise14",
            });
        }
    }, [user]);

      const total = useMemo(() => {
        return products.reduce(
            (sum, item) =>
                sum +
                Number(item.product_price || 0) *
                    Number(item.qt || 0),
            0
        );
    }, [products]);

    const totalItems = useMemo(() => {
        return products.reduce(
            (sum, item) => sum + Number(item.qt || 0),
            0
        );
    }, [products]);

    const shipping = total > 0 ? 5 : 0;

    const grandTotal = total + shipping;

 

   const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        try {

            const paymentIntent = await CreateOne("payment", {
                amount: grandTotal,
            });

            const clientSecret = paymentIntent.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),

                    billing_details: {
                        name: form.firstname + " " + form.lastname,
                        email: form.email,
                    },
                },
            });

            if (result.error) {
                alert(result.error.message);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {

                const response = await CreateOne("order", {
                    form,
                    products,
                    total: grandTotal,
                });

                if (response.data.status === 200) {

                    setCart({
                        product: [],
                    });

                    navigate("/orders");
                }
            }

        } catch (error) {
            console.log(error);
        }
    };
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if(loading){
        return(<div className="text-center bg-info">......Loading......</div>)
    }

 return (
    <div className="container py-4">
        <div className="row g-4">

            <div className="col-lg-8">

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body p-4 p-md-5">

                        <div className="mb-4">
                            <h3 className="fw-bold mb-1">
                                Checkout
                            </h3>

                            <p className="text-muted mb-0">
                                Fill in your information to complete the order.
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
                                        value={form.firstname}
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
                                        value={form.lastname}
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
                                                form.paymentMethod === "card"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="form-check-label ms-2">
                                            Credit / Debit Card
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
                                                form.paymentMethod === "paypal"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="form-check-label ms-2">
                                            Paypal
                                        </span>

                                    </div>

                                </label>

                            </div>

                            <div className="mt-4">

                                <label className="form-label fw-semibold">
                                    Card information
                                </label>

                                <div
                                    className="border rounded-3 p-3 bg-white"
                                >
                                    <CardElement
                                        options={{
                                            hidePostalCode: true,
                                        }}
                                    />
                                </div>

                            </div>

                            <button
                                className="btn btn-dark w-100 rounded-pill py-2 mt-4"
                                type="submit"
                            >
                                Pay ${grandTotal.toFixed(2)}
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

                        <h5 className="fw-bold mb-4">
                            Order Summary
                        </h5>

                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-muted">
                                Products
                            </span>

                            <span className="fw-semibold">
                                {products.length}
                            </span>

                        </div>

                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-muted">
                                Items
                            </span>

                            <span className="fw-semibold">
                                {totalItems}
                            </span>

                        </div>

                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-muted">
                                Subtotal
                            </span>

                            <span className="fw-semibold">
                                ${total.toFixed(2)}
                            </span>

                        </div>

                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-muted">
                                Shipping
                            </span>

                            <span className="fw-semibold">
                                ${shipping.toFixed(2)}
                            </span>

                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">

                            <span className="fw-bold">
                                Total
                            </span>

                            <span className="fs-4 fw-bold text-success">
                                ${grandTotal.toFixed(2)}
                            </span>

                        </div>

                        <hr />

                        {products.map((item) => (

                            <div
                                key={item.product_id}
                                className="d-flex justify-content-between align-items-center mb-3"
                            >

                                <div>

                                    <div className="fw-semibold">
                                        {item.product_name}
                                    </div>

                                    <small className="text-muted">
                                        Qty : {item.qt}
                                    </small>

                                </div>

                                <div className="fw-bold">

                                    $
                                    {(
                                        Number(item.product_price) *
                                        Number(item.qt)
                                    ).toFixed(2)}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    </div>
);
};
