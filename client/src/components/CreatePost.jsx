import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormGroup from 'react-bootstrap/esm/FormGroup';

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [blogBody, setBlogBody] = useState("")

    const modules = {
        toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }],
        // [{ font: [] }],
        // [{ size: [] }],
        ["bold", "italic", "underline", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
        ],
        ["link", "image"],
        ],
    };

    const initialValues = {
        author: "",
        title: "",
        body: ""
    }

    const [userSubmit, setUserSubmit] = useState(initialValues);
    console.log(location.state)
    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setUserSubmit(location.state)
            setBlogBody(location.state.body)
        }
        else {
            setUserSubmit(initialValues)
        }
    }, [])


    const handleInput = (e) => {
        setUserSubmit({ ...userSubmit, [e.target.name]: e.target.value })
    }

    const handleCancel = event => {
        event.preventDefault();
        setUserSubmit({
            author: "",
            title: "",
            body: ""
        })
        navigate("/post")
    }

    async function postApi(e) {
        e.preventDefault()
        console.log({ userSubmit });
        const jsonBody = {
            author: userSubmit.author,
            title: userSubmit.title,
            body: blogBody
        }
        console.log("call");
        const res = await fetch('http://localhost:4000/api/create', {
            method: 'POST',
            body: JSON.stringify(jsonBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("test", res);
        let resJson = await res.json();
        if (resJson.msg) {
            setUserSubmit({
                author: "",
                title: "",
                body: ""
            })
            navigate("/post")
        }
    }
    console.log(blogBody)

    async function editPost(e) {
        e.preventDefault()
        const jsonBody = {
            author: userSubmit.author,
            title: userSubmit.title,
            body: blogBody
        }
        const res = await fetch(`http://localhost:4000/api/edit/${userSubmit._id}`, {
            method: 'PUT',
            body: JSON.stringify(jsonBody),
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
            alert('Post Updated')
            navigate(`/post/${userSubmit._id}`)
        }
    }

    return (
        <div className='form'>
            <Form onSubmit={location.state ? (e) => { editPost(e) } : postApi}>
                <h1>{location.state ? "Update" : "New"} Post</h1>
                <Form.Group className="mb-3" controlId="formAuthor">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control autoFocus type="text" placeholder="Enter name" autoComplete="false" value={userSubmit.author} name="author" onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" autoComplete="false" value={userSubmit.title} name="title" onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBody">
                    <Form.Label>Description</Form.Label>
                    <ReactQuill theme="snow" value={blogBody} onChange={setBlogBody} name="body" className="editor-input" modules={modules} />
                    {/* <Form.Control type="text" className='input-body' autoComplete="false" value={userSubmit.body} name="body" maxLength={100} onChange={handleInput} required /> */}
                </Form.Group>
                <div className='createPost-btn'>
                    <Button variant="primary" type="submit" className='saveButton'>
                        {location.state ? "Update" : "Save"}
                    </Button>
                    <Button variant="primary" type="submit" className='cancel-button' onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePost;