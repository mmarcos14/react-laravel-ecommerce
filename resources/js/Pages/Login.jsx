import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { CreateOne ,login} from "../Service/Api"
import { useAuth } from "../ServiceContext/ProviderContext"

export const Login=()=>{
    const {login}=useAuth();
    const [dataUser,setDataUser]=useState({
        email:'',password:''
    })

    const handleInput=(e)=>{
        setDataUser({...dataUser,[e.target.name]:e.target.value})
    }

    const save=async(e)=>{
        e.preventDefault();
        const response=await login('user',dataUser)
        console.log(response.data.message)
    }
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                 <div className="card">
                    <div className="card-header">Register</div>
                    <div className="card-body shadow-sm bg-body">
                        <Form onSubmit={save}>
                          

                              <Form.Group>
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control 
                                className="mb-2" 
                                name="email"
                                onChange={handleInput} value={dataUser.email}
                                required
                                />
                            </Form.Group>

                              <Form.Group>
                                <Form.Label htmlFor="password">password</Form.Label>
                                <Form.Control 
                                className="mb-2" 
                                name="password"
                                onChange={handleInput} value={dataUser.password}
                                required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Button variant="primary" type="submit" className="float-end btn-sm ">Login</Button>
                            </Form.Group>
                        </Form>
                    </div>
                 </div>
                 
                </div>
            </div>
        </div>
    )
}