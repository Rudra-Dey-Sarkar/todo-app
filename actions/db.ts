"use server"
import mongoose from "mongoose"
const DB = process.env.NEXT_PUBLIC_DB!;

const ConnectDB = ()=>{
    console.log("Pre db connection");
    mongoose.connect(DB).then(()=>{
        console.log("Database connected");
        
    }).catch((errors)=>{
        console.log("Cannot Connect to database due to :-",errors);
    })
    console.log("Post db connection");
}

export default ConnectDB;