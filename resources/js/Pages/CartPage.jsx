import { Link } from "react-router-dom";
import { useCart } from "../ServiceContext/ProviderCartContext";

export const CartPage = () => {
  const { cart, removeCart, incrementCart, decrementCart } = useCart();
  const products = cart?.product || [];

  const total = products.reduce(
    (sum, item) => sum + Number(item.product_price || 0) * Number(item.qt || 0),
    0
  );

  const totalItems = products.reduce(
    (sum, item) => sum + Number(item.qt || 0),
    0
  );

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
        <div>
          <h3 className="fw-bold mb-1">My Cart</h3>
          <small className="text-muted">
            {products.length} product(s) • {totalItems} item(s)
          </small>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <div className="card border-0 shadow-sm rounded-4 p-5 mx-auto" style={{ maxWidth: "520px" }}>
            <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
            <h5 className="fw-semibold mb-2">Your cart is empty</h5>
            <p className="text-muted mb-0">
              Add some products to continue your checkout.
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {products.map((item) => (
                <div key={item.product_id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                  <div className="card-body p-3 p-md-4">
                    <div className="row align-items-center g-3">
                      <div className="col-3 col-md-2">
                        <img
                          src={
                            item.product_image
                              ? `uploads/products/${item.product_image}`
                              : "https://via.placeholder.com/120"
                          }
                          alt={item.product_name}
                          className="img-fluid rounded-4 object-fit-cover"
                          style={{ width: "100%", height: "96px" }}
                        />
                      </div>

                      <div className="col-9 col-md-7">
                        <div className="d-flex flex-column gap-2">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <h6 className="fw-bold mb-0 text-dark">
                              {item.product_name}
                            </h6>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-pill"
                              onClick={() => removeCart(item.product_id)}
                            >
                              Remove
                            </button>
                          </div>

                          <small className="text-muted">
                            Unit price:{" "}
                            <span className="fw-semibold text-dark">
                              ${Number(item.product_price || 0).toFixed(2)}
                            </span>
                          </small>

                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-light border rounded-circle"
                              style={{ width: "36px", height: "36px" }}
                              onClick={() => decrementCart(item.product_id)}
                            >
                              −
                            </button>

                            <span className="badge text-bg-primary rounded-pill px-3 py-2">
                              Qty {item.qt}
                            </span>

                            <button
                              className="btn btn-light border rounded-circle"
                              style={{ width: "36px", height: "36px" }}
                              onClick={() => incrementCart(item.product_id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-3 text-md-end">
                        <small className="text-muted d-block">Amount</small>
                        <span className="fs-5 fw-bold text-success">
                          $
                          {(
                            Number(item.product_price || 0) *
                            Number(item.qt || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 position-sticky" style={{ top: "24px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Products</span>
                  <span className="fw-semibold">{products.length}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items</span>
                  <span className="fw-semibold">{totalItems}</span>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-semibold">Total</span>
                  <span className="fs-4 fw-bold text-success">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link to={'/checkout'} className="btn btn-dark w-100 rounded-pill py-2 mb-2">
                  Checkout
                </Link>

                <button className="btn btn-outline-secondary w-100 rounded-pill py-2">
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};