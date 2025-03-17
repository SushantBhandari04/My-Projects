function ProfileCard({image, name, email, contact, location}){
    return <div className=" hidden dark:bg-black-100 sm:flex flex-col justify-around rounded-lg items-center h-72 m-2 w-1/6 text-sm shadow-lg p-4 pt-6 pb-6 -translate-y-10  bg-white-400 ml-12">
        <img src={image} alt="" className="h-20 w-24 rounded-lg mb-2" />
        <div className="text-lg font-bold">{name}</div>
        <div className="flex flex-col justify-center items-center gap-0.5">
            <div >{email}</div>
            <div>{contact}</div>
        </div>
        <div>{location}</div>
    </div>
}

export default ProfileCard