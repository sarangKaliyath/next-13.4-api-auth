import mongoose from 'mongoose';
import dbConnect from "../../utils/dbConnect";
import UserModel from "../../model/UserModel";
const ObjectId = mongoose.Types.ObjectId;


// search users
export async function GET(request){

   
    try{

        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        await dbConnect();

        const users = await UserModel.find({
            username: {$regex: username, $options: "i" }
        });


        return new Response(users, {status: 200})

    }catch(error){
        console.log(error);
        return new Response("Error", {status: 500})
    }

}