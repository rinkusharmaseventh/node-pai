const mongoose = require("mongoose");

const DB ="mongodb+srv://crudappname:crudapppass@cluster0.zcaix5p.mongodb.net/crudappdatabase?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message))