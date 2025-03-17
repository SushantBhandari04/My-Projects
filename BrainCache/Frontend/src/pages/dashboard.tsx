import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { AddContentModal } from "../components/AddContentModal"
import { Button } from "../components/button"
import { PlusIcon, ShareIcon } from "../components/icons"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Card } from "../components/Card"
import { ObjectId } from "mongodb"
import { Logo } from "../components/Logo"

export type Type = "youtube" | "twitter" | "document" | "link" ;



function Dashboard(){
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<{title:string, link:string, type:Type, _id:ObjectId  }[]>([])

  async function getContent(setContent:Dispatch<SetStateAction<{title:string, link:string, type:Type, _id:ObjectId }[]>>){
    axios.get(`${BACKEND_URL}/api/v1/content`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response)=>{
      console.log(response.data.content)
      setContent(response.data.content);
    })
  }

  async function Delete(id:ObjectId){
    await axios.delete(`${BACKEND_URL}/api/v1/content`,{
        data:{
            id
        },
        headers:{
            Authorization: localStorage.getItem("token")
        }
    })
    setContent(prev=>prev.filter((item)=>item._id!=id));
  }

  async function shareBrain(){
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true  // Removed 'data' object wrapping
      }, {
        headers: {
          Authorization: token
        }
      });
  
      if (response) {
        const hash = response.data.hash;
        const link = `${BACKEND_URL}/api/v1/brain/${hash}`;
        
        // Focus the document before writing to clipboard
        if (document.hasFocus()) {
          navigator.clipboard.writeText(link);
          alert("Share link copied.");
        } else {
          window.focus();
          navigator.clipboard.writeText(link);
          alert("Share link copied.");
        }
        
      } else {
        alert("Error.");
      }
    } catch (e) {
      alert("error");
      console.log("Errr", e);
    }
  }
  

  useEffect(()=>{
    getContent(setContent);
  },[])


  return (
    <div className=" h-screen w-screen  font-sans">
      <div className="flex justify-between items-center ">
        <div className="flex justify-between w-full h-fit mb-8 py-4 bg-gray-100 px-6">
          <Logo/>
          <div className="flex gap-4">
            <Button variant="primary" size="md" title="Add Content" startIcon={<PlusIcon/>} onClick={()=>setOpen(true)}/>
            <Button variant="secondary" size="md" title="Share Brain" startIcon={<ShareIcon size={4} color="bg-violet-500"/>} onClick={shareBrain}/>
          </div>
        </div>
        
      </div>
      <div className="flex gap-10 px-6 flex-wrap mx-8 justify-center">
        {content.map((item,index)=><Card onDelete={Delete}  key={index} title={item.title} link={item.link} type={item.type} _id={item._id}/>)}
      </div>
    {open && <AddContentModal setOpen={setOpen} setContent={setContent}/>}
    </div>
  );
}


export default Dashboard