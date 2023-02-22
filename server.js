const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path : './config.env'
})

mongoose.set('strictQuery', true);

const DB = process.env.DataBase;
mongoose.connect(DB, {
    UseNewUrlParser : true
}).then( () => {
    console.log(`DB is Connected successfully....`);
})




app.listen(process.env.PORT, () => {
    console.log(`App is running on PORT ${process.env.PORT}....`);
})