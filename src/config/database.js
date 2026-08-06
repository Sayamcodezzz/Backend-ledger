const mongoose = require("mongoose");


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("server is connected to DB");
        // console.log(mongoose.connection.name + ": " + mongoose.connection.readyState);
        //   console.log("Database Name:", mongoose.connection.name); 
        // console.log("Host:", mongoose.connection.host);
    
        })
    .catch((err)=>{
        console.log(`Error connecting to DB ${err}`);
        process.exit(1);
    })
}

module.exports=connectToDb