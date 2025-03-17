import Dashboard from "./pages/dashboard"
import Signin from "./pages/signin"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/signup"

function App(){
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="braincache/user/signup" element={<Signup/>}/>
                    <Route path="braincache/user/signin" element={<Signin/>}/>
                    <Route path="braincache/user/dashboard" element={<Dashboard/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
}

export default App