import { useRef, useState } from "react"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import ProfileCard from "./components/ProfileCard";
import WebinarCard from "./components/WebinarCard";
import TaskComponent from "./components/TaskComponent";
import SideBar from "./components/SideBar";
import GreetCard from "./components/GreetCard";
import Top from "./components/Top";
import Bars from "./components/Bars";
import ToggleTheme from "./components/ToggleTheme";



function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex dark:bg-black-200 dark:text-white-700">
      <Bars setOpen={setOpen} open={open} />
      <div
        className={`flex flex-col justify-center p-0 m-0 transition-all duration-300 ${
          open ? 'w-1/4' : 'w-0 bg-white-500 sm:bg-black-500'
        }`}
      >
        <SideBar open={open} />
      </div>
      <div className="w-full">
       <div className="flex justify-right">
       <Top />
       <ToggleTheme/>
       </div>

        <div className="flex gap-8">
          <ProfileCard
            image="../images/girlImage.png"
            name="Nezuko"
            email="nezuko@gmail.com"
            contact={9888888888}
            location="Swordsmith Village"
          />
          <div className="flex flex-col w-full sm:w-3/4 sm:mt-0 mt-4 mr-8 sm:mr-0 relative sm:static">
            <GreetCard />
            <div className="flex gap-8 items-center flex-col sm:flex-row">
              <WebinarCard />
              <TaskComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


  // return <div className="flex">
  //   
  // </div>

  // return <BrowserRouter>
  //   <Routes>
  //     <Route path="*" element={<FirstPage/>}/>
  //     <Route path="/second" element={<SecondPage/>}/>
  //     <Route path="/third" element={<ThirdPage/>}/>
  //   </Routes>
  // </BrowserRouter>



function FirstPage(){
  const [state, setState] = useState(false);

  return <div className="bg-blue-700 h-screen flex flex-col justify-center items-center">
  <Logo/>
  <Heading heading={"Verify Your Age"}/>
  <div className="flex flex-col justify-center items-center mb-52">
    <SubHeading subHeading={"Please confirm your birth year.This data will not be stored."}/>
    <BirthInput setState={setState}/>
    <Button state={state}  placeHolder="Your Birth Year" path="/second"/>
  </div>
  </div>
}

function SecondPage(){
  const [state, setState] = useState(false);


  return <div className="bg-blue-700 h-screen flex flex-col justify-center items-center">
  <Logo/>
  <Heading heading="Let's Get Started"/>
  <div className="flex flex-col justify-center items-center mb-52">
    <SubHeading subHeading=""/>
    <BirthInput setState={setState} placeHolder="Email Id"/>
    <Button state={state}  path="/third"/>
  </div>
  </div>
}

function ThirdPage(){
  const [state, setState] = useState(false);

  return <div className="bg-blue-700 h-screen flex flex-col justify-center items-center">
    <Logo/>
    <Heading heading="Check Your Email For A Code"/>
    <div className="flex flex-col justify-center items-center mb-52">
      <SubHeading subHeading="Please enter the verification code sent to your email id "/>
      <OtpBox setState={setState} number={6}/>
      <Button state={state} />
    </div>
  </div>
}

function Logo(){
  return <div className="mt-8">
    <img src="../logo.png" alt="" className="h-10" />
  </div>
}

function Heading({heading}){
  return <div className="text-white-300 text-xl font-bold text-2xl mb-20 mt-20">
    {heading}
  </div>
}

function SubHeading({subHeading}){
  return <div className="text-white-100 mb-4 text-sm">
    {subHeading}
  </div>
}

function BirthInput({ setState, placeHolder}){
  return <div className="bg-blue-300 rounded-xl w-72  flex justify-center text-sm h-10 my-2 mb-8">
    <input onChange={()=>setState(true)} type="text" placeholder={placeHolder} className="border-none rounded-xl bg-blue-300 m-0 w-72 h-10 px-4 text-white-100  text-sm" />
  </div>
}

function Button({state, path}){
  return <Link to={path}><div className={`  p-1.5 rounded-md w-72 flex justify-center font-bold text-sm h-9 cursor-pointer ${state ? 'bg-green-300 text-black-500' : 'bg-blue-100 text-white-300'}`} >
    Continue
  </div>
  </Link>
}

function OtpBox({setState, number}){
  const inputEl = useRef([]);

  return <div className="mb-16">
    {new Array(number).fill(0).map((n,i)=>(
      <Box key={i} reference={(ref)=>inputEl.current.push(ref)} goBack={()=>{
        if(i==0){
          return;
        }
        inputEl.current[i-1].value = ""
        inputEl.current[i-1].focus();
      }}

      setState={setState}

      onDone={()=>{
        if(i>=number-1){
          setState(true);
          return;
        }
        inputEl.current[i+1].focus();
      }}/>))}

  </div>
}

function Box({reference, onDone, goBack}){
  return <>
  <input type="text" ref={reference} onKeyUp={(event)=>{
    if(event.key=="Backspace"){
      goBack();
    }
  }} onChange={(e)=>{
    const val = e.target.value;
    if(val=="0"||val=="1"||val=="2"||val=="3"||val=="4"||val=="5"||val=="6"||val=="7"||val=="8"||val=="9"){
      onDone()
    }else{
      e.target.value = ""
    }
  }} className="bg-blue-300 w-8 m-2 h-10 rounded-lg text-white-100 text-sm border-none px-3" />
  </> 
}

export default App
