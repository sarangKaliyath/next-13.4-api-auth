'use client'
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {

    const router = useRouter();
    const initialState = {email: '', password: ""}
    const [val, setVal] = useState(initialState);

        const handleChange = (e) => {
            const {name, value} = e.target;
            setVal((prev) => ({...prev, [name]: value}))
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            const userData = await loginRequest(val);
            
            if(userData?.token && userData?.loggedInUserId) router.push('/')

            setVal(initialState)
        }

    return( <>
        <div className="ml-2">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name = "email"
                        type='email'
                        value = {val.email}
                        onChange={handleChange}
                        label ="Email"
                        placeholder="Enter Email address"
                    />
                </div>
                <div>
                    <input
                        name = "password"
                        type="password"
                        value = {val.password}
                        onChange={handleChange}
                        label = "Password"
                        placeholder="Enter Password"
                    />
                </div>
                <div>
                    <button type="submit">
                        Login
                    </button>
                </div>
            </form>
    </div>
    </>)
}

export default LoginPage


const loginRequest = async (data) =>{
    const res = await axios.post(`${baseUrl}/auth`, data);
    const {token, loggedInUserId} = res.data;
    Cookies.set("token", token, {expires: 1})
    Cookies.set("userId", loggedInUserId, {expires: 1})

    return res.data;
}