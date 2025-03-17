import { useState } from "react";
import BelowButton from "../components/belowButton";
import Button from "../components/button";
import Heading from "../components/heading";
import Input from "../components/input";
import SubHeading from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return <div className="h-screen w-full flex justify-center items-center bg-gray-200">

    
    <div className="w-2/5 h-fit flex flex-col gap-8 justify-center items-center shadow-xl px-12 py-8 rounded-lg bg-white">

        <div className="flex flex-col gap-2 items-center">
            <Heading title="Signup"/>
            <SubHeading title="Enter your information to create an account."/>
        </div>
        
        <Input onChange={(e)=>{setFirstName(e.target.value)}} placeholder="John" label="First Name"/>
        <Input onChange={(e)=>{setLastName(e.target.value)}} placeholder="Doe" label="Last Name"/>
        <Input onChange={(e)=>{setUsername(e.target.value)}} placeholder="john@gmail.com" label="Email"/>
        <Input onChange={(e)=>{setPassword(e.target.value)}} placeholder="" label="Password"/>

        <div className="flex flex-col w-full justify-center items-center gap-4">
            <Button title="Sign up" onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    password,
                    firstName,
                    lastName
                })

                if(response){
                    alert("Signed up successfully!")
                    navigate("/signin");
                }
                else{
                    alert("Error")
                }
            }}/>
            <BelowButton title="Already have an account?" linkName="Login" to="/signin" />
        </div>
        
    </div>

    </div>
}