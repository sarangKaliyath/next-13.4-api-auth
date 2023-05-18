import mongoose from 'mongoose';
import CategoryModel from "../../model/CategoryModel";
import dbConnect from '../../utils/dbConnect';

export async function GET(req){

    try {
        
        await dbConnect();
        
        const cats = await CategoryModel.find({}).exec();
        
        return new Response(cats, {status: 200})

    } catch (error) {
        console.log(error);
        return new Response({error : error}, {status: 500} )
    }

}

export async function POST(req){
    const data = await req.json();

    if(!data.name){
        return new Response("Category title is required", {status: 400});
    }

    try{

        await dbConnect();
        const cat = await new CategoryModel(data).save();
        return new Response(cat, {status: 201});
    }   
    catch(error){
        console.log(error);
        return new Response({error: error}, {status: 500})
    }
}
