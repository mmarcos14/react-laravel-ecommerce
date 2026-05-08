import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../ServiceContext/ProviderContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Register = () => {
    const [dataUser, setDataUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
  const navigate=useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };
    const { CreateOne } = useAuth();

    const save = async (e) => {
        e.preventDefault();

        try {
            setErrors({});
            const response = await CreateOne("user", dataUser);
            if(response.data.status===200){
             navigate("/home")
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body shadow-sm bg-body">
                            <Form onSubmit={save}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">
                                        Name
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        name="name"
                                        onChange={handleInput}
                                        value={dataUser.name}
                                    />
                                   {errors?.name?.[0] && (
                                    <span className="text-danger">
                                        {errors.name[0]}
                                    </span>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="email">
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        name="email"
                                        onChange={handleInput}
                                        value={dataUser.email}
                                    />
                                      {errors?.email?.[0] && (
                                    <span className="text-danger">
                                        {errors.email[0]}
                                    </span>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">
                                        password
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        name="password"
                                        onChange={handleInput}
                                        value={dataUser.password}
                                    />
                                      {errors?.password?.[0] && (
                                    <span className="text-danger">
                                        {errors.password[0]}
                                    </span>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password_confirmation">
                                        Confirmation password
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        name="password_confirmation"
                                        onChange={handleInput}
                                        value={dataUser.password_confirmation}
                                    />
                                      {errors?.password_confirmation?.[0] && (
                                    <span className="text-danger">
                                        {errors.password_confirmation[0]}
                                    </span>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="float-end btn-sm "
                                    >
                                        Sve
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
