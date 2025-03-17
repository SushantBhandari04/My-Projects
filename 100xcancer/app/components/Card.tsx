export default function Card(){
    return <div className="bg-orange-100 w-fit py-12 md:px-16 px-8 flex flex-col md:flex-row  gap-12 justify-center items-center rounded-3xl">
        <img src="vimal.png" alt="" className="md:h-48 sm:h-44 h-32"/>
        <div className="flex flex-col md:gap-6 gap-4">
            <div className="flex gap-2 sm:text-4xl text-2xl font-semibold text-orange-500">100xCancer <h3 className="text-orange-900">Elaichi</h3></div>
            <div className="flex w-fit sm:text-lg text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
            <div className="flex md:gap-12 text-sm sm:text-lg gap-4 w-full md:w-fit">
                <button className="bg-orange-500 text-white py-2 w-full md:w-fit md:px-5 rounded-lg">Die Now</button>
                <button className="bg-white text-orange-900 py-2 w-full md:w-fit md:px-5 rounded-lg">Die Later</button>
            </div>
        </div>
    </div>
}