const User = require("./../models/users")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const { SECRET_KEY } = process.env;

exports.createLogin = async (req, res) => {
    // console.log(req.body);
    try{
        const { email, password } = req.body;
        const data = await User.findOne({ email: email });
            // res.json({ msg: "user login successfully" })
        if (!data) return res.status(401).json({ error: "User does not exist" })
        if (data) {
            const isPasswordCorrect = bcrypt.compareSync(password, data.password)
            // console.log("USER INFO::", data.password == )
            if (isPasswordCorrect) {
                // TOKEN GENERATION - jsonwebtoken
                const tokens = jwt.sign({ _id: User._id }, SECRET_KEY, { expiresIn: '1h' })
                console.log(tokens)
                // SAVE TOKEN IN COOKIE - cookie-parser AND SEND RESPONSE
                const { password, ...user } = data._doc
                res.cookie("access_token", tokens, {
                    expiresIn: '1h',
                    httpOnly: true
                }).status(200).json({ user, token: tokens });
            } else {
                res.status(401).json({error: "User or Password is incorrect."})
            }
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
}

exports.createUser = async (req, res) => {
    User.findOne({ email: req.body.email }).then(async (data) => {
        if (data) return res.json({ msg: "User already exists" })
        // bcrypt package to hash the password before saving the record
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const createData = { ...req.body, password: passwordHash }
        let user = new User(createData);
        // console.log(passwordHash);
        user.save().then((data) => {
            if (data) res.json({ msg: "User Registered Successfully" })
        }).catch((err) => {
            console.log(err)
        })
    })
}




