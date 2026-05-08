import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "react-bootstrap";
import { useAuth } from "../../ServiceContext/ProviderContext";
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
  const [loading, setLoading] = useState(true);

  // INPUT TEXT
  const handleInput = (e) => {
    setData({ ...dataProduct, [e.target.name]: e.target.value });
  };

  // FILE
  const uploadFile = (e) => {
    setData({
      ...dataProduct,
      photo: Array.from(e.target.files),
    });
  };

  // GET CATEGORIES
  const getCategories = async () => {
    const response = await FetchAll("category");
    setCategory(response.data.categoriesdata);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
    }
  }, [CurrentProduct]);

  // SAVE
  const save = async (e) => {
    e.preventDefault();

    try {
      setErrors({});
      setLoading(true);

      const formdata = new FormData();

      dataProduct.photo.forEach((file) => {
        formdata.append("photos[]", file);
      });

      formdata.append("id", CurrentProduct?.id);
      formdata.append("name", dataProduct.name);
      formdata.append("price", dataProduct.price);
      formdata.append("quantity", dataProduct.quantity);
      formdata.append("description", dataProduct.description);
      formdata.append("category_id", dataProduct.category_id);
      formdata.append("is_popular", dataProduct.is_popular ? "1" : "0");
      formdata.append("is_status", dataProduct.is_status ? "1" : "0");

      const apiCall = CurrentProduct?.id ? updateOne : CreateOne;
      const response = await apiCall("product", formdata);

      if (response.status === 200) {
        HideModal?.();
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);

      //  LARAVEL ERRORS HERE
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  // GET ERROR HELPER
  const getError = (field) => errors?.[field]?.[0];

  return (
    <Modal show={showm} size="lg" centered backdrop="static">

      {/* HEADER */}
      <ModalHeader className="bg-primary text-white">
        {action_title}
        <button className="btn-close" onClick={HideModal}></button>
      </ModalHeader>

      <Form onSubmit={save}>
        <ModalBody className="p-4 bg-light">

          <div className="bg-white p-4 rounded-4 shadow-sm">

            <Row className="g-3">

              {/* CATEGORY */}
              <div className="col-6">
                <Form.Group>
                  <Form.Label>Category</Form.Label>

                  <Form.Select
                    name="category_id"
                    value={dataProduct.category_id}
                    onChange={handleInput}
                  >
                    <option>Choose category</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
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
              <div className="col-6">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={dataProduct.name}
                    onChange={handleInput}
                  />

                  {getError("name") && (
                    <small className="text-danger">
                      {getError("name")}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* PRICE */}
              <div className="col-6">
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={dataProduct.price}
                    onChange={handleInput}
                  />

                  {getError("price") && (
                    <small className="text-danger">
                      {getError("price")}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* QUANTITY */}
              <div className="col-6">
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={dataProduct.quantity}
                    onChange={handleInput}
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
                  <Form.Label>Photos</Form.Label>
                  <Form.Control type="file" multiple onChange={uploadFile} />

                  {getError("photos") && (
                    <small className="text-danger">
                      {getError("photos")}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* SWITCHES */}
              <div className="col-12">
                <div className="d-flex gap-5 p-3 border rounded-3 bg-light">

                  <Form.Check
                    type="switch"
                    label="Active product"
                    checked={dataProduct.is_status}
                    onChange={(e) =>
                      setData({
                        ...dataProduct,
                        is_status: e.target.checked,
                      })
                    }
                  />

                  <Form.Check
                    type="switch"
                    label="Popular product"
                    checked={dataProduct.is_popular}
                    onChange={(e) =>
                      setData({
                        ...dataProduct,
                        is_popular: e.target.checked,
                      })
                    }
                  />

                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="col-12">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={dataProduct.description}
                    onChange={handleInput}
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
        <div className="p-3 d-flex justify-content-end bg-white border-top">
          <button className="btn btn-primary px-4" type="submit">
            {loading ? "Save Product" : "Saving..."}
          </button>
        </div>

      </Form>
    </Modal>
  );
};