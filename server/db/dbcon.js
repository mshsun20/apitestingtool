const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'config.env'})
const url = process.env.DB_URL
// DB_URL='mongodb+srv://mshsun20:smsh=20@mshcrmdb.kp1iqma.mongodb.net/?retryWrites=true&w=majority'

const conn = async () => {
    try {
        const result = await mongoose.connect(url)
        if (result) {
            console.log(`DB Successfully Connected...`)
        }
    } catch (error) {
        console.error(first)
    }
}
conn()