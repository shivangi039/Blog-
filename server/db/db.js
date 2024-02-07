const mongoose = require("mongoose")

exports.connection = () => {
    mongoose.connect(process.env.DATABASE)
    // .then(() => {
    //     console.log('DB CONNECTED SUCCESSFULLY')
    // }).catch((err) => {
    //     console.log("DB CONNECTION ERROR::", err)
    // })
}

