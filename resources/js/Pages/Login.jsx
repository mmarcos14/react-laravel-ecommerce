import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../ServiceContext/ProviderServiceContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { login, getUser } = useAuth();

    const [dataUser, setDataUser] = useState({
        email: "",
        password: "",
    });

    const [errors, setError] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value,
        });
    };

    const save = async (e) => {
        e.preventDefault();

        try {
            const response = await login("user", dataUser);

            if (response.status === 200) {
                await getUser();
                navigate("/shop");
            }
        } catch (e) {
            if (e.response?.status === 403) {
                setError(e.response.data.message);
            }
        }
    };

    return (
        <div
            className="container-fluid vh-100 d-flex justify-content-center align-items-center"
            style={{
                background:
                    "linear-gradient(135deg,#4e73df,#224abe,#1cc88a)",
            }}
        >
            <div className="row w-100 justify-content-center">
                <div className="col-md-5 col-lg-4">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">
                                <i
                                    className="bi bi-person-circle"
                                    style={{
                                        fontSize: "65px",
                                        color: "#0d6efd",
                                    }}
                                ></i>

                                <h2 className="fw-bold mt-3">
                                    Welcome Back
                                </h2>

                                <p className="text-muted">
                                    Login to continue shopping
                                </p>
                            </div>

                            {errors && (
                                <div className="alert alert-danger text-center">
                                    {errors}
                                </div>
                            )}

                            <Form onSubmit={save}>

                                <Form.Group className="mb-3">

                                    <Form.Label>Email</Form.Label>

                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={dataUser.email}
                                        onChange={handleInput}
                                        placeholder="Enter your email"
                                        className="rounded-pill"
                                        required
                                    />

                                </Form.Group>

                                <Form.Group className="mb-4">

                                    <Form.Label>Password</Form.Label>

                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={dataUser.password}
                                        onChange={handleInput}
                                        placeholder="Enter your password"
                                        className="rounded-pill"
                                        required
                                    />

                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100 rounded-pill py-2"
                                    variant="primary"
                                >
                                    Login
                                </Button>

                            </Form>

                            <div className="text-center mt-4">

                                <small className="text-muted">
                                    Don't have an account?
                                </small>

                                <br />

                                <Link
                                    to="/register"
                                    className="text-decoration-none fw-bold"
                                >
                                    Create an account
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};