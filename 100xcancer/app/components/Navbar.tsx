import Link from "next/link"

export default function Navbar(){
    return <div className="w-screen h-fit sm:px-12 px-4 md:w-11/12 flex justify-between items-center">
        <div className="flex text-white sm:text-2xl text-xl font-semibold  tracking-tighter">100x<h1 className="text-orange-600">Cancer</h1></div>
        <div className="text-lg font-semibold tracking-tight flex sm:gap-12 gap-2 sm:text-md text-sm text-orange justify-center items-center">
            <Link href="#products"><div className="flex text-orange-800  ">Products</div></Link>
            <button className="flex  justify-center items-center bg-orange-500 text-white sm:px-5 px-3 sm:py-1.5 py-1 rounded-md">Login</button>
        </div>
    </div>
}