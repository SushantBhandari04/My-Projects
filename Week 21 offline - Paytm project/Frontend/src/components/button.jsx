export default function Button({title, onClick, color}){
    const bgColor = color=="green" ? "bg-green-500" : "bg-black";
    return <>
        <button className={`${bgColor} text-white w-full rounded-lg h-10`} onClick={onClick}><h3 className="font-semibold">{title}</h3></button>
    </>
}