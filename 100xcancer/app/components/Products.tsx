import Card from "./Card";

export default function Products(){
    return <div id="products" className="bg-orange-50 w-fit sm:py-12 py-8  md:px-32 md:px-24 sm:px-16 px-8 flex flex-col justify-center items-center md:gap-16 sm:gap-12 gap-8 rounded-3xl h-fit">
        <div className="flex flex-col sm:gap-2 gap-0.5 justify-center items-center">
            <h1 className="text-orange-800 font-bold md:text-5xl  sm:text-4xl text-2xl">Cancerous Products</h1>
            <h3 className="font-medium text-orange-800 sm:text-lg text-xs md:text-lg  text-center">Discover an extensive section of highly cancerous products designed for you.</h3>
        </div>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
}