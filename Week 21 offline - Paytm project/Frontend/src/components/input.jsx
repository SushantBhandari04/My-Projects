export default function Input({label, placeholder, onChange}){
    return <div className="flex flex-col gap-2 w-full">
        <label className="text-lg font-medium" htmlFor="input">{label}</label>
        <input type="text" onChange={onChange} className="border-2 rounded-md p-2" placeholder={placeholder}/>
    </div>
}