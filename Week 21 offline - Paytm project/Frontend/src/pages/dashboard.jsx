import { useEffect, useState } from "react";
import Heading from "../components/heading";
import axios from "axios";
import Input from "../components/input";
import User from "../components/user";

export default function Dashboard(){
    const [balance, setBalance] = useState("");
    const [userDetails, setUserDetails] = useState({
        firstName: "Sushant",
        lastName: "Bhandari",
        username: "sushant@gmail.com"
    })
    const [showDetails, setShowDetails] = useState(false);

    const [users, setUsers] = useState([{
        firstName: "Sushant",
        lastName: "Bhandari",
        _id: 1
    }]);
    const [filter, setFilter] = useState("");

    const token = localStorage.getItem("token")
    console.log(token);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: token
            }
        })
        .then(response=>setBalance(response.data.balance))
        .catch(e=>console.log(e));

        axios.get("http://localhost:3000/api/v1/user/me",{
            headers: {
                Authorization: token
            }
        })
        .then(response=>setUserDetails({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username
        }))
        .catch(e=>console.log(e));

    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                Authorization: token
            }
        })
        .then(response=>{
            console.log(response.data.user)
            setUsers(response.data.user)
        })
        .catch(e=>console.log(e));
    },[filter])
    
    return <div className="w-full flex flex-col gap-8">
        <div className="flex justify-between w-full bg-gray-200 py-4 px-12">
            <Heading title="Payments App"/>
            <div className="flex gap-4 justify-center items-center">
                <h1 className="text-xl font-semibold">Hello, {userDetails.firstName}</h1>
                <div onClick={()=>{
                    setShowDetails(true);
                }} className="bg-green-500 text-white rounded-full h-10 w-10 flex justify-center items-center">{userDetails.firstName[0].toUpperCase()}</div>
            </div>
        </div>

        {showDetails && <div>
            // Add modal for user details
        </div>}

        <div className="flex flex-col gap-8 px-12">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Your Balance : </h2>
                <h3 className="text-xl text-green-600 font-semibold">${balance}</h3>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Users </h2>
                <Input onChange={(e)=>setFilter(e.target.value)} label="" placeholder="Search Users"/>

            </div>

            <br />
            <div className="flex flex-col gap-4">
                {users.map(user=><User user={user}/>)}
            </div>
        </div>
        
    </div>
}