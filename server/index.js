require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require("body-parser")
const { connection } = require("./db/db")
const cookieParser = require("cookie-parser");
const cors = require('cors')
const PORT = process.env.PORT || 3001;

// MIDDLEWARES
app.use(cors("*"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser());
// IMPORTING ROUTERS
const blogRoutes = require("./routes/blogs.js")
const userRoutes = require("./routes/users.js")

// USING ROUTES
app.use("/api", blogRoutes);
app.use("/api", userRoutes);

// MONGO DB CONNECTION USING MONGOOSE
connection()


app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})