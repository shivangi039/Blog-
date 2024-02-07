import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditPost = () => {
    const navigate = useNavigate();
    const location = useLocation()

    console.log("LOCATION::", location.state)
    const params = useParams();
    const [userSubmit, setUserSubmit] = useState(location.state);

    const handleInput = (e) => {
        setUserSubmit({ ...userSubmit, [e.target.name]: e.target.value })
    };

    async function editPost(e) {
        e.preventDefault()
        const res = await fetch(`http://localhost:4000/api/edit/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(userSubmit),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let resJson = await res.json();
        if (resJson.msg) {
            setUserSubmit({
                author: "",
                title: "",
                body: ""
            })
            navigate(`/post/${params.id}`)
        }
    }

    return (
        <div className='form'>
            <h1>Edit post</h1>
            <Form onSubmit={editPost}>
                <Form.Group className="mb-3" controlId="formAuthor">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control autoFocus type="text" placeholder="Enter name" autoComplete="false" value={userSubmit.author} name="author" onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" autoComplete="false" value={userSubmit.title} name="title" onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" className='input-body' autoComplete="false" value={userSubmit.body} name="body" maxLength={100} onChange={handleInput} required />
                </Form.Group>
                <Button variant="primary" type="submit" className='saveButton'>
                    Save
                </Button>
                <Button variant="primary" type="submit" className='button' onClick={() => {}}>
                    Cancel
                </Button>
            </Form>
        </div>
    )
}

export default EditPost;
