import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "react-bootstrap";

import { useAuth } from "../../ServiceContext/ProviderServiceContext";
import { useEffect, useState } from "react";

export const ModalProduct = ({
  showm,
  HideModal,
  CurrentProduct,
  action_title,
}) => {

  const { CreateOne, updateOne, FetchAll } = useAuth();

  const [dataProduct, setData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    photo: [],
    category_id: "",
    is_status: false,
    is_popular: false,
  });

  const [categories, setCategory] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // INPUT
  const handleInput = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // FILES
  const uploadFile = (e) => {
    setData((prev) => ({
      ...prev,
      photo: Array.from(e.target.files),
    }));
  };

  // GET CATEGORIES
  useEffect(() => {

    let mounted = true;

    const getCategories = async () => {
      try {

        const response = await FetchAll("category");

        // IMPORTANT
        // on verifie si le composant existe encore
        if (mounted) {
          setCategory(response.data.categoriesdata);
        }

      } catch (e) {
        console.log(e);
      }
    };

    getCategories();

    // CLEANUP
    return () => {
      mounted = false;
    };

  }, []);

  // UPDATE DATA WHEN EDIT
  useEffect(() => {

    if (CurrentProduct) {

      setData({
        name: CurrentProduct?.name || "",
        price: CurrentProduct?.price || "",
        quantity: CurrentProduct?.quantity || "",
        description: CurrentProduct?.description || "",
        category_id: CurrentProduct?.category_id || "",
        is_status: CurrentProduct?.is_status ?? false,
        is_popular: CurrentProduct?.is_popular ?? false,
        photo: [],
      });

    } else {

      // RESET FORM WHEN CREATE
      setData({
        name: "",
        price: "",
        quantity: "",
        description: "",
        photo: [],
        category_id: "",
        is_status: false,
        is_popular: false,
      });
    }

  }, [CurrentProduct, showm]);

  // SAVE
  const save = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setErrors({});

      const formdata = new FormData();

      // MULTIPLE IMAGES
      dataProduct.photo.forEach((file) => {
        formdata.append("photos[]", file);
      });

      formdata.append("id", CurrentProduct?.id || "");
      formdata.append("name", dataProduct.name);
      formdata.append("price", dataProduct.price);
      formdata.append("quantity", dataProduct.quantity);
      formdata.append("description", dataProduct.description);
      formdata.append("category_id", dataProduct.category_id);
      formdata.append(
        "is_status",
        dataProduct.is_status ? "1" : "0"
      );

      formdata.append(
        "is_popular",
        dataProduct.is_popular ? "1" : "0"
      );

      const apiCall = CurrentProduct?.id
        ? updateOne
        : CreateOne;

      const response = await apiCall("product", formdata);

      if (
        response.status === 200 ||
        response.status === 201
      ) {

        HideModal?.();

        // RESET FORM
        setData({
          name: "",
          price: "",
          quantity: "",
          description: "",
          photo: [],
          category_id: "",
          is_status: false,
          is_popular: false,
        });
      }

    } catch (e) {

      // VALIDATION LARAVEL
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors);
      }

      console.log(e);

    } finally {

      setLoading(false);
    }
  };

  // ERROR HELPER
  const getError = (field) => {
    return errors?.[field]?.[0];
  };

  return (

    <Modal
      show={showm}
      onHide={HideModal}
      size="lg"
      centered
      backdrop="static"
    >

      {/* HEADER */}
      <ModalHeader className="bg-primary text-white">

        <div>
          <h5 className="mb-0 fw-bold">
            {action_title}
          </h5>

          <small className="opacity-75">
            Manage your product information
          </small>
        </div>

        <button
          className="btn-close btn-close-white"
          onClick={HideModal}
        ></button>

      </ModalHeader>

      <Form onSubmit={save}>

        <ModalBody className="bg-light p-4">

          <div className="bg-white rounded-4 shadow-sm p-4">

            <Row className="g-4">

              {/* CATEGORY */}
              <div className="col-md-6">

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Category
                  </Form.Label>

                  <Form.Select
                    name="category_id"
                    value={dataProduct.category_id}
                    onChange={handleInput}
                  >

                    <option value="">
                      Select category
                    </option>

                    {categories?.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}

                  </Form.Select>

                  {getError("category_id") && (
                    <small className="text-danger">
                      {getError("category_id")}
                    </small>
                  )}

                </Form.Group>

              </div>

              {/* NAME */}
              <div className="col-md-6">

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Product Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={dataProduct.name}
                    onChange={handleInput}
                    placeholder="Enter product name"
                  />

                  {getError("name") && (
                    <small className="text-danger">
                      {getError("name")}
                    </small>
                  )}

                </Form.Group>

              </div>

              {/* PRICE */}
              <div className="col-md-6">

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Price
                  </Form.Label>

                  <Form.Control
                    type="number"
                    name="price"
                    value={dataProduct.price}
                    onChange={handleInput}
                    placeholder="0.00"
                  />

                  {getError("price") && (
                    <small className="text-danger">
                      {getError("price")}
                    </small>
                  )}

                </Form.Group>

              </div>

              {/* QUANTITY */}
              <div className="col-md-6">

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Quantity
                  </Form.Label>

                  <Form.Control
                    type="number"
                    name="quantity"
                    value={dataProduct.quantity}
                    onChange={handleInput}
                    placeholder="Stock quantity"
                  />

                  {getError("quantity") && (
                    <small className="text-danger">
                      {getError("quantity")}
                    </small>
                  )}

                </Form.Group>

              </div>

              {/* PHOTO */}
              <div className="col-12">

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Product Photos
                  </Form.Label>

                  <Form.Control
                    type="file"
                    multiple
                    onChange={uploadFile}
                    max={6}
                  />

                  {getError("photos") && (
                    <small className="text-danger">
                      {getError("photos")}
                    </small>
                  )}

                </Form.Group>

              </div>

              {/* SWITCHES */}
              <div className="col-12">

                <div className="border rounded-4 p-3 bg-light d-flex gap-5">

                  <Form.Check
                    type="switch"
                    label="Active Product"
                    checked={dataProduct.is_status}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        is_status: e.target.checked,
                      }))
                    }
                  />

                  <Form.Check
                    type="switch"
                    label="Popular Product"
                    checked={dataProduct.is_popular}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        is_popular: e.target.checked,
                      }))
                    }
                  />

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="col-12">

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Description
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={dataProduct.description}
                    onChange={handleInput}
                    placeholder="Write product description..."
                  />

                  {getError("description") && (
                    <small className="text-danger">
                      {getError("description")}
                    </small>
                  )}

                </Form.Group>

              </div>

            </Row>

          </div>

        </ModalBody>

        {/* FOOTER */}
        <div className="bg-white border-top p-3 d-flex justify-content-end gap-2">

          <button
            type="button"
            className="btn btn-light"
            onClick={HideModal}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={loading}
          >

            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                ></span>

                Saving...
              </>
            ) : (
              "Save Product"
            )}

          </button>

        </div>

      </Form>

    </Modal>
  );
};