import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

export default function Home(){
  return <div style={{fontFamily:"DM Sans"}} h-screen className="w-fit h-fit tracking-tight flex flex-col justify-center items-center font-sans bg-gradient-to-b from-amber-300 to-orange-600 pt-4 pb-12 md:px-8">
    <Navbar/>
    <Hero/>
    <Products/>
    <Footer/>
  </div>
}