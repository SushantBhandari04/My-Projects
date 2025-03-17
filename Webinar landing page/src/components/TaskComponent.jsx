function TaskComponent(){
    return <div className="dark:bg-black-100 grid grid-cols-2 justify-around rounded-lg items-center h-64 m-2 w-3/5 sm:w-2/6 text-sm shadow-lg  p-2 pl-4">
        <TaskItem url={"../images/calendar.png"} title={"Schedule a Webinar"}/>
        <TaskItem url={"../images/plus.png"} title={"Join a Webinar"}/>
        <TaskItem url={"../images/film.png"} title={"Open Recordings"}/>
    </div>
}

function TaskItem({url, title}){
    return <div className="flex flex-col col-span-1 justify-center items-center gap-2 ">
        <Image url={url}/>
        <div className="font-semibold text-sm">{title}</div>
    </div>
}

function Image({url}){
    return <>
        <img className="h-12 w-12 bg-green-300 dark:bg-green-100 p-2.5 rounded-md" src={url} alt="" />
    </>
}

export default TaskComponent