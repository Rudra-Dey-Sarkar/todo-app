"use server"
import mongoose from "mongoose"
const DB = process.env.NEXT_PUBLIC_DB!;

const ConnectDB = ()=>{
    mongoose.connect(DB).then(()=>{
        console.log("Database connected");
    }).catch((errors)=>{
        console.log("Cannot Connect to database due to :-",errors);
    })
}

export default ConnectDB;