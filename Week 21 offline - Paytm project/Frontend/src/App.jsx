import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./pages/signup"
import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import SendMoney from "./pages/send"

function App(){
  return <div className="flex justify-center items-center">
    
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<SendMoney/>}/>
    </Routes>
  </BrowserRouter>

  
  </div>
}

export default App