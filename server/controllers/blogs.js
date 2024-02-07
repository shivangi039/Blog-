const Blog = require("./../models/blogs");

exports.getPosts = (req, res) => {
    Blog.find().exec().then((data) => {
        if (data) {
            res.json(data)
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.getPostById = (req, res) => {
    Blog.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data)
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.deleteById = (req, res) => {
    Blog.findOneAndDelete({_id: req.params.id}).then(() => {
        res.status(200).json({ message: 'Deleted' });
    }).catch((err) => {
        console.log(err)
    }) 
}

exports.editById = (req, res) => {
    console.log(req.params.id)
    console.log({ _id: req.params.id }, req.body)
    Blog.findOneAndUpdate({ _id: req.params.id }, req.body).then((data) => {
        if (data) {
            res.send({ msg: "Record Saved Successfully" })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.createPost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((data) => {
        if (data) {
            res.send({ msg: "Record Saved Successfully" })
        }
    }).catch((err) => {
        console.log(err)
    })
}