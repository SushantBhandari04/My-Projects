import { MutableRefObject } from "react";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

function SignPage({ title, buttonOnClick, usernameRef, passwordRef, subTitle, linkPath, linkName }: { title: string, buttonOnClick: () => void, usernameRef: MutableRefObject<HTMLInputElement | null>, passwordRef: MutableRefObject<HTMLInputElement | null>, subTitle:string, linkPath:string, linkName:string }) {
    return (
        <div style={{ fontFamily: "'Manrope', serif" }} className="h-screen w-screen flex">
            <div className="w-1/2 shadow-black shadow-3xl">
                <img src="../../images/signup-image.jpg" alt="" className="h-full w-full" />
            </div>

            <div className="h-full w-1/2 flex flex-col bg-blue-500 shadow-3xl shadow-black ">
                <div className="flex flex-col gap-16">
                    <div style={{ fontFamily: "'Josefin Sans', serif" }} className="justify-center items-center text-white text-5xl font-semibold mb-12 mt-12 flex">
                        Welcome to <span style={{ fontFamily: '"Caveat", serif' }} className="ml-4 tracking-tighter text-black">Brain</span> <span style={{ fontFamily: '"Caveat", serif' }} className="tracking-tighter text-white">Cache</span>
                    </div>
                    <h1 style={{ fontFamily: "'Josefin Sans', serif" }} className="text-yellow-200 text-3xl font-bold w-full flex justify-center">{title}</h1>

                    <div className="flex flex-col gap-16 justify-center items-center w-full">
                        <div className="flex flex-col gap-12 w-full">
                            <Input2 reference={usernameRef} placeholder="Username" />
                            <Input2 reference={passwordRef} placeholder="Password" />
                        </div>
                        <div className="flex flex-col w-full justify-center items-center">
                            <Button variant="tertiary" size="lg" title={title} onClick={buttonOnClick} />
                            <div className="flex text-white text-sm mt-5 gap-1">
                                {subTitle}
                                <Link to={linkPath} className="text-yellow-300 font-semibold">{linkName}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Input2Props {
    reference: MutableRefObject<HTMLInputElement | null>,
    placeholder: string
}

function Input2({ reference, placeholder }: Input2Props) {
    return (
        <div className="h-10 w-full flex items-center justify-center">
            <input
                ref={reference}
                className="w-5/12 h-full p-4 border-2 rounded-3xl"
                type="text"
                placeholder={placeholder}
            />
        </div>
    );
}

export default SignPage;
