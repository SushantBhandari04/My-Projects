import { useNavigate } from "react-router-dom";
import Button from "./button";

export default function User({user}){
    const userId = user._id;
    const name = user.firstName;

    const navigate = useNavigate();

    return <div className="w-full flex justify-between">

     <div className="flex gap-4 items-center">
        <div className="font-semibold flex rounded-full w-8 h-8 bg-gray-100 justify-center items-center">{user.firstName[0].toUpperCase()}</div>
        <h2 className="text-xl font-semibold">{user.firstName}</h2>
        
    </div >
    <div className="w-32">
    <Button title="Send Money" onClick={()=>{
        navigate(`/send?id=${userId}&name=${name}`)
    }}/>

    </div>
    </div>

}