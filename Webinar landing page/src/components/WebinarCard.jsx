function WebinarCard(){
    return <div className="dark:bg-black-100 flex flex-col gap-0.5  rounded-lg items-center h-fit m-2 w-full sm:w-3/5 text-sm border-black  p-4 pb-1 shadow-lg ">
        <InputDate/>
        <WebinarCardContent live={"Live"}/>
        <Line/>
        <WebinarCardContent live={"Upcoming"}/>
        <Line/>
        <WebinarCardContent live={"Upcoming"}/>
        <Line/>
        <WebinarCardContent live={"Upcoming"}/>
    </div>
}

function Line(){
    return <>
        <img src="../images/horizontalLine.png" className="w-full p-0 m-0 h-0.5" alt="" />
    </>
}

function InputDate(){
    return <div className="w-full  rounded-lg dark:bg-black-100   p-0 mb-2">
        <input className="w-full cursor-pointer border-solid rounded-md bg-white-200 dark:bg-black-200 dark:text-white-700  p-1 m-0" type="date" />
    </div>
}

function WebinarCardContent({live}){
    return <div className="flex w-full gap-2 my-2" >
        <div className="flex flex-col gap-0.5 ">
            <div className="font-semibold">
                11:30 AM
            </div>
            <div className="text-xs">
                11:30 AM
            </div>
        </div>
        <img className="h-12 w-2" src="../images/line.png" alt="" />
        <div className="flex flex-col gap-0.5">
            <div className="flex gap-1.5 items-center">
                <div className="text-xs">{live}</div>
               {live=="Live" ? <img className="h-3 w-3"   src="../images/redVideo.png" alt="" /> : <img className="h-3 w-3"   src="../images/blueVideo.png" alt="" /> }
            </div>
            <div className="text-md font-semibold">
                UX Webinar
            </div>
        </div>
    </div>
}

export default WebinarCard