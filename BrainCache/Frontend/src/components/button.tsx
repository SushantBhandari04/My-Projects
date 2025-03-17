import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "tertiary";
    size: "sm" | "md" | "lg";
    title: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    disabled?: boolean;
}

const buttonColor = {
    primary: "bg-violet-500 text-white rounded-md hover:bg-violet-600 active:bg-violet-700 disabled:bg-gray-300",
    secondary: "bg-violet-200 text-violet-500 rounded-md hover:bg-violet-300 active:bg-violet-400 disabled:bg-gray-200",
    tertiary: "bg-yellow-400 text-black rounded-full hover:bg-yellow-500 active:bg-yellow-600 disabled:bg-gray-300"
};

const buttonSize = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-5 text-base",
    lg: "h-12 px-6 text-lg"
};

export function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`flex items-center justify-center gap-2 font-medium cursor-pointer transition-all duration-200
                ${buttonColor[props.variant]} ${buttonSize[props.size]} 
                ${props.disabled ? "cursor-not-allowed opacity-50" : ""}`
            }
        >
            {props.startIcon}
            {props.title}
            {props.endIcon}
        </button>
    );
}
