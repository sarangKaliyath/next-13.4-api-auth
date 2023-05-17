import dbConnect from "../../utils/dbConnect";
import UserModel from "../../model/UserModel";
import isEmail from "validator/lib/isEmail";
import bcrypt from 'bcrypt'
const userProfilePic = '/userProfile.png' 

export async function POST(request){
    
    const data = await request.json()
    const { password, username, email, name , profilePicUrl } = data;
    console.log(data);
    if(!isEmail(email)) return res.status(401).send("Invalid Email");

    if (password.length < 6) return res.status(401).send("Password must be at-least 6 characters");

    try{
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const userObj = {
            name : name,
            email: email,
            password: hashedPassword,
            username: username.toLowerCase(),
            profilePicUrl: profilePicUrl || userProfilePic,
        }

        await dbConnect();

        const userEmailExist = await UserModel.findOne({email: email.toLowerCase()});
        const userNameExist = await UserModel.findOne({username: username.toLowerCase()});

        if(userEmailExist){
            return new Response ('User Email already registered!', {status: 400})
        }

        if(userNameExist) return new Response('Username already registered!', {status: 400})

        const saveUsers = await new UserModel(userObj).save()

        return new Response(saveUsers, {status: 200})


    }catch(error){
        // console.log(error)
        return new Response('Error', {error: error, status: 500})
    }
}