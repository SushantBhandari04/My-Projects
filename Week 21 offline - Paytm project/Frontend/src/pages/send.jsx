import { useSearchParams } from "react-router-dom"
import Heading from "../components/heading";
import Input from "../components/input";
import Button from "../components/button";
import axios from "axios";
import { useState } from "react";

export default function SendMoney(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [amount, setAmount] = useState(null);

    const receiverId = searchParams.get('id');
    const receiverName = searchParams.get('name');

    console.log(receiverId )
    console.log(receiverName )

    return <div className="w-full flex h-screen justify-center items-center bg-gray-200">
        <div className="flex flex-col justify-center items-center gap-20  w-2/6 h-fit shadow-lg p-12 rounded-lg bg-white">
        <Heading title="Send Money"/>
        <div className="flex flex-col justify-center  gap-12 w-full">
            <div className="flex gap-4 items-center ">
                <div className="bg-green-500 text-white font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center">{receiverName[0].toUpperCase()}</div>
                <h3 className="text-2xl font-semibold">{receiverName}</h3>
            </div>

            <Input onChange={(e)=>setAmount(e.target.value)} label="Amount (in Rs)" placeholder="Enter amount"/>
            <Button color="green" title="Initiate Transfer" onClick={async ()=>{
                try{
                    await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to: receiverId,
                        amount
                    },{
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    alert("Transaction successful.")
                }
                catch(e){
                    alert("Insufficient balance!")
                    console.log(e);
                }
               
            }}/>
        </div>
        
    </div>
    </div>
    
    
}