const mongoose = require('mongoose');




const connectDb = (url) => {
return  mongoose.connect(url,
    {//those params to remove deprecations messages
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}

 module.exports = connectDb;