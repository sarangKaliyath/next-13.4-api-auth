import isEmail from "validator/lib/isEmail";
import UserModel from "../../model/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import dbConnect from "../../utils/dbConnect";

export async function POST(req){

    
    const data = await req.json();
    const {email, password} = data;
    if(!isEmail(email)) return new Response('Invalid Email', {status: 401});
    
    if(password.length < 6) return new Response('Password Must be minimum 6 characters long!', {status: 401})
    
    try {
        
        await dbConnect();

        const user = await UserModel.findOne({email: email.toLowerCase()}).select('+password')

        if(!user) return new Response('Email not registered', {status: 401});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) return new Response("Invalid Password", {status: 401});

        const payload = {userId: user._id};
        
        const token = jwt.sign({
            data: payload
          }, process.env.JWT_SECRET , {expiresIn: '1h'});

        const output = {
            token : token,
            loggedInUserId: user._id
        }

        return new Response(JSON.stringify(output), {status: 200});

    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }   

}