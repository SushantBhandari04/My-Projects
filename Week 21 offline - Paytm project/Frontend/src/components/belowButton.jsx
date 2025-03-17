import { Link } from "react-router-dom";

export default function BelowButton({title, to, linkName}){
    return <div className="flex gap-1">
        {title}
        <Link className="text-blue-700" to={to}>{linkName}</Link>
    </div>
}