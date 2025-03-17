import { useNavigate } from "react-router-dom";
import BelowButton from "../components/belowButton";
import Button from "../components/button";
import Heading from "../components/heading";
import Input from "../components/input";
import SubHeading from "../components/subHeading";
import { useState } from "react";
import axios from "axios";

export default function Signin(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="h-screen w-full flex justify-center items-center bg-gray-200">

    
    <div className="w-2/5 h-fit flex flex-col gap-8 justify-center items-center shadow-xl px-12 py-12 rounded-lg bg-white">

        <div className="flex flex-col gap-2 items-center">
            <Heading title="Signin"/>
            <SubHeading title="Enter your credentials to access your account."/>
        </div>
        
        <Input onChange={(e)=>{setUsername(e.target.value)}} placeholder="john@gmail.com" label="Email"/>
        <Input onChange={(e)=>{setPassword(e.target.value)}} placeholder="" label="Password"/>

        <div className="flex flex-col w-full justify-center items-center gap-4">
            <Button title="Sign in" onClick={async ()=>{

                try{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    })
                    const token = "Bearer " + response.data.token;

                    localStorage.setItem("token", token);

                    navigate("/dashboard")
                }
                catch(e){
                    console.log(e);
                    alert("Error")
                }
                

            }}/>
            <BelowButton title="Don't have an account?" linkName="Sign Up" to="/signup"/>
        </div>
        
    </div>

    </div>
}