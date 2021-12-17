const mongoose = require("mongoose");
mongoose.connection
.once("open", ()=>{
    console.log("Connection with MongoDB is successfull!");
})
.on("error", ()=>{
    console.log("Error during connection to MongoDB!");
});
mongoose.connect("mongodb+srv://user:user@cluster0.nka5m.mongodb.net/UserMongoose?retryWrites=true&w=majority", 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});