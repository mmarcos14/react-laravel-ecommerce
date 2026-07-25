
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../ServiceContext/ProviderServiceContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [dataUser, setDataUser] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const { CreateOne, getUser, setUser } = useAuth();

    const save = async (e) => {
        e.preventDefault();

        try {
            setErrors({});
            const response = await CreateOne("user", dataUser);

            if (response.data.status === 200) {
                setUser(response.data.userc);
                await getUser();
                navigate("/shop");
            }
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            } else {
                console.error(e);
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

                <div className="col-lg-5 col-md-7">

                    <div className="card border-0 shadow-lg rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <i
                                    className="bi bi-person-plus-fill"
                                    style={{
                                        fontSize: "60px",
                                        color: "#0d6efd",
                                    }}
                                ></i>

                                <h2 className="fw-bold mt-3">
                                    Create Account
                                </h2>

                                <p className="text-muted">
                                    Register to start shopping.
                                </p>

                            </div>

                            <Form onSubmit={save}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <Form.Label>Last Name</Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="lastname"
                                            value={dataUser.lastname}
                                            onChange={handleInput}
                                            className="rounded-pill"
                                        />

                                        {errors?.lastname?.[0] && (
                                            <small className="text-danger">
                                                {errors.lastname[0]}
                                            </small>
                                        )}

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <Form.Label>First Name</Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="firstname"
                                            value={dataUser.firstname}
                                            onChange={handleInput}
                                            className="rounded-pill"
                                        />

                                        {errors?.firstname?.[0] && (
                                            <small className="text-danger">
                                                {errors.firstname[0]}
                                            </small>
                                        )}

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <Form.Label>Email</Form.Label>

                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={dataUser.email}
                                        onChange={handleInput}
                                        className="rounded-pill"
                                    />

                                    {errors?.email?.[0] && (
                                        <small className="text-danger">
                                            {errors.email[0]}
                                        </small>
                                    )}

                                </div>

                                <div className="mb-3">

                                    <Form.Label>Password</Form.Label>

                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={dataUser.password}
                                        onChange={handleInput}
                                        className="rounded-pill"
                                    />

                                    {errors?.password?.[0] && (
                                        <small className="text-danger">
                                            {errors.password[0]}
                                        </small>
                                    )}

                                </div>

                                <div className="mb-4">

                                    <Form.Label>
                                        Confirm Password
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        name="password_confirmation"
                                        value={
                                            dataUser.password_confirmation
                                        }
                                        onChange={handleInput}
                                        className="rounded-pill"
                                    />

                                    {errors?.password_confirmation?.[0] && (
                                        <small className="text-danger">
                                            {errors.password_confirmation[0]}
                                        </small>
                                    )}

                                </div>

                                <Button
                                    type="submit"
                                    className="w-100 rounded-pill py-2"
                                >
                                    Create Account
                                </Button>

                            </Form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

