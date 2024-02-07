import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { FloatingLabel, Image } from 'react-bootstrap';
import loginImage from '../img/undraw_login_re_4vu2.svg';

const Login = () => {
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const handleLoginInput = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    async function loginApi(e) {
        e.preventDefault();
        console.log({ userLogin });
        const res = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userLogin),
        })
        let resJson = await res.json();
        if (res.status == 401) {
            alert(resJson.error)
            return
        }
        if (res.status == 200) {
            console.log(res);
            localStorage.setItem('token', resJson.token)
            localStorage.setItem('user', JSON.stringify(resJson.user))
            if (resJson.token) {
                setUserLogin({
                    email: "",
                    password: ""
                })
                navigate("/CreatePost")
            }
        }
        // alert("Invalid Credential")

    }

    return (
        <div className='login-form d-flex justify-content-center align-items-center'>
            <Form onSubmit={loginApi}>
                <h1>Login</h1>
                <Form.Group className="form-group mb-5" controlId="formEmail">
                    <Form.Label><i className="zmdi zmdi-email"></i></Form.Label>
                    <Form.Control autoFocus type="email" placeholder="Enter email" className='form-input' value={userLogin.email} onChange={handleLoginInput} name="email" />
                </Form.Group>
                <Form.Group className="form-group mb-5" controlId="formPassword">
                    <Form.Label><i className="zmdi zmdi-lock"></i></Form.Label>
                    <Form.Control type="password" placeholder="Enter password" className='form-input' value={userLogin.password} onChange={handleLoginInput} name="password" />
                </Form.Group>
                <Button variant="primary" type="submit" className='submit-btn mt-4'>
                    Log in
                </Button>
                <div className='register-opt text-center'>
                    <p>Don't have an account? <a href="/register">Sign up</a>.</p>
                </div>
            </Form>
            <Image src={loginImage} alt="" />
        </div>
    )
}

export default Login;