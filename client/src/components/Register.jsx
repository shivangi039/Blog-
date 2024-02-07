import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();

    const [userRegister, setUserRegister] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleUserInput = (e) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value })
    }

    async function userApi(e) {
        e.preventDefault();
        console.log({ userRegister });
        const res = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            body: JSON.stringify(userRegister),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let resJson = await res.json();
        if (resJson.msg) {
            setUserRegister({
                username: "",
                email: "",
                password: ""
            })
            navigate("/login")
        }
    }

    return (
        <div className='register-form d-flex'>
            <Form onSubmit={userApi}>
                <h1>Registration</h1>
                <Form.Group className="form-group mb-4 mb-sm-3 mb-md-4 mb-lg-5" controlId="formUsername">
                    {/* <Form.Label>Username</Form.Label> */}
                    <Form.Label><i class="zmdi zmdi-account"></i></Form.Label>
                    <Form.Control autoFocus type="text" placeholder="Enter username" className='form-input' value={userRegister.username} onChange={handleUserInput} name="username" />
                </Form.Group>
                <Form.Group className="form-group mb-4 mb-sm-3 mb-md-4 mb-lg-5" controlId="formEmail">
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Label><i class="zmdi zmdi-email"></i></Form.Label>
                    <Form.Control autoFocus type="email" placeholder="Enter email" className='form-input' value={userRegister.email} onChange={handleUserInput} name="email" />
                </Form.Group>
                <Form.Group className="form-group mb-4 mb-sm-3 mb-md-4 mb-lg-5" controlId="formPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Label><i class="zmdi zmdi-lock"></i></Form.Label>
                    <Form.Control type="password" placeholder="Enter password" className='form-input' value={userRegister.password} onChange={handleUserInput} name="password" />
                </Form.Group>
                <Button variant="primary" type="submit" className='submit-btn mt-4'>
                    Register
                </Button>
                <div className='login-opt text-center'>
                    <p>Already have an account? <a href="/login">Log in</a>.</p>
                </div>
            </Form>
        </div>
    )
}

export default Register;