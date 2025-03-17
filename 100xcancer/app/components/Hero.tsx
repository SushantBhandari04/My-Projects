export default function Hero(){
    return <div className="flex w-fit flex-col sm:gap-1 md:gap-2  gap-0.5 justify-center items-center sm:mt-12 mt-8">
        <div className="flex gap-2 md:text-6xl sm:text-5xl text-3xl font-bold text-orange-900">Bolo Zubaan <h1 className="text-white">Canceri</h1></div>
        <h3 className="text-orange-900 md:text-lg sm:text-lg text-sm font-semibold">More you eats, sooner you dies</h3>
        <img src="hero.png" alt="Hero image" className="sm:h-[460px] md:h-[550px] h-[380px]"/>
    </div>
}