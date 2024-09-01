import { Link } from "react-router-dom"
export function Bottomwarming({label,buttonText,to}){
    return <div className="px-2 text-sm justify-center flex">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer " to={to}>
        {buttonText}
        </Link>
    </div>
}