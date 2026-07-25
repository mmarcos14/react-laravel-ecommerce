import { useEffect, useState } from "react";
import { useAuth } from "../ServiceContext/ProviderServiceContext";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

export const OrdersList = () => {
  const [order, setOrder] = useState([]);
  const [getindividualOrder, setIndividual] = useState(null);
  const [viewmodal, setModal] = useState(false);

  const { FetchAll } = useAuth();

  const getOrderList = async () => {
    const response = await FetchAll("order");
    setOrder(response.data.dataorder);
    console.log(response.data.dataorder)
  };



  useEffect(() => {
    getOrderList();
  }, []);

  const safeData = Array.isArray(order) ? order : [];

  const DetailsOdors = (item) => {
    setIndividual(item);
    setModal(true);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">

        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📦 My Orders</h4>
          <span className="badge bg-warning text-dark fs-6">
            {safeData.length} Orders
          </span>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th># Order</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {safeData.length > 0 ? (
                  safeData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>#{item.num_cmd}</strong>
                      </td>

                      <td className="text-success fw-bold">
                        ${item.total_cmd}
                      </td>

                      <td>{item.date_cmd}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm rounded-pill px-3"
                          onClick={() => DetailsOdors(item)}
                        >
                          👁 Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No orders found 😢
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Modal */}

      <Modal
        show={viewmodal}
        onHide={() => setModal(false)}
        centered
        size="lg"
      >
        <ModalHeader closeButton>
          <ModalTitle>
            Order #{getindividualOrder?.num_cmd}
          </ModalTitle>
        </ModalHeader>

        <ModalBody>

          <div className="row mb-4">

            <div className="col-md-4">
              <div className="border rounded p-3 bg-light">
                <small className="text-muted">Date</small>
                <h6>{getindividualOrder?.date_cmd}</h6>
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3 bg-light">
                <small className="text-muted">Total</small>
                <h5 className="text-success">
                  ${getindividualOrder?.total_cmd}
                </h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3 bg-light">
                <small className="text-muted">Items</small>
                <h5>
                  {getindividualOrder?.itemsorder?.length}
                </h5>
              </div>
            </div>

          </div>

          <h5 className="mb-3">Products</h5>

          <table className="table table-bordered table-striped">

            <thead className="table-secondary">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {getindividualOrder?.itemsorder?.map((item) => (
                <tr key={item.id}>
                  <td>

                    <div className="d-flex align-items-center">

                      <img
                        src={`/uploads/products/${item.product.photo }`}
                        alt=""
                        width="70"
                        height="70"
                        className="rounded border me-3"
                      />

                      <div>
                        <strong>{item.product.name}</strong>
                        <br />
                        <small className="text-muted">
                          ID : {item.product.id}
                        </small>
                      </div>

                    </div>

                  </td>

                  <td>${item.price}</td>

                  <td>{item.quantity}</td>

                  <td className="fw-bold text-success">
                    ${item.total}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                          getindividualOrder.status == "pending"
                          ? "bg-warning text-dark"
                          : getindividualOrder.status =="Delivered"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {getindividualOrder.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </ModalBody>

      </Modal>
    </div>
  );
};