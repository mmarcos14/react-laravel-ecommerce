import { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useAuth } from "../../ServiceContext/ProviderServiceContext";

export const CreateModalCategory = ({
  showm,
  HideModal,
  CurrentCategory,
  onSubmit,
  refreshlist
}) => {

  const [datacategory, setData] = useState({
    name: "",
    description: "",
    photo: null,
    is_status: false,
    is_popular: false,
  });

  const { CreateOne, updateOne } = useAuth();

  const handleInput = (e) => {
    setData({ ...datacategory, [e.target.name]: e.target.value });
  };

  const uploadFile = (e) => {
    setData({ ...datacategory, photo: e.target.files[0] });
  };

  useEffect(() => {
    if (CurrentCategory) {
      setData({
        name: CurrentCategory?.name || "",
        description: CurrentCategory?.description || "",
        photo: CurrentCategory?.photo || null,
        is_status: CurrentCategory?.is_status ?? false,
        is_popular: CurrentCategory?.is_popular ?? false,
      });
    }
  }, [CurrentCategory]);

  const save = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", CurrentCategory?.id);
    formData.append("name", datacategory.name);
    formData.append("description", datacategory.description);
    formData.append("photo", datacategory.photo);

    formData.append("is_status", datacategory.is_status ? "1" : "0");
    formData.append("is_popular", datacategory.is_popular ? "1" : "0");

    try {
      const apiCall = CurrentCategory?.id ? updateOne : CreateOne;
      await apiCall("category", formData);
      HideModal?.();
      refreshlist?.();
    } catch (e) {
      console.log(e.response?.data);
    }
  };

  return (
    <Modal
      show={showm}
      onHide={HideModal}
      centered
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton className="bg-white border-0 pb-0">
        <div>
          <Modal.Title className="fw-bold">
            {CurrentCategory ? "Update Category" : "Create Category"}
          </Modal.Title>
          <small className="text-muted">
            Fill the form below to save a category
          </small>
        </div>
      </Modal.Header>

      <Form onSubmit={save}>
        <Modal.Body className="pt-3">

          {/* CARD STYLE CONTAINER */}
          <div className="p-3 border rounded-4 bg-light">

            <Row className="g-3">

              {/* NAME */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={datacategory.name}
                    onChange={handleInput}
                    placeholder="Enter category name"
                  />
                </Form.Group>
              </Col>

              {/* PHOTO */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    onChange={uploadFile}
                  />
                </Form.Group>
              </Col>

              {/* CHECKBOX SECTION (PRO UI) */}
              <Col md={12}>
                <div className="d-flex gap-5 align-items-center p-3 bg-white rounded-3 border">

                  {/* STATUS */}
                  <Form.Check
                    type="switch"
                    label="Active"
                    checked={datacategory.is_status}
                    onChange={(e) =>
                      setData({
                        ...datacategory,
                        is_status: e.target.checked,
                      })
                    }
                  />

                  {/* POPULAR */}
                  <Form.Check
                    type="switch"
                    label="Popular"
                    checked={datacategory.is_popular}
                    onChange={(e) =>
                      setData({
                        ...datacategory,
                        is_popular: e.target.checked,
                      })
                    }
                  />

                </div>
              </Col>

              {/* DESCRIPTION */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={datacategory.description}
                    onChange={handleInput}
                    placeholder="Write a short description"
                  />
                </Form.Group>
              </Col>

            </Row>

          </div>
        </Modal.Body>

        {/* IMAGE PREVIEW */}
        {CurrentCategory?.photo && (
          <div className="text-center mt-3">
            <img
              src={`http://127.0.0.1:8000/uploads/categories/${CurrentCategory.photo}`}
              alt={CurrentCategory.name}
              style={{
                maxWidth: "100%",
                maxHeight: "280px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}

        {/* FOOTER */}
        <Modal.Footer className="border-0 pt-3">
          <Button variant="outline-secondary" onClick={HideModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Category
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};