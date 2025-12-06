import React from "react";

function Button({
    children,
    type = "button",
    bgcolour = "bg-[#7B68EE]",
    textColour = "text-white",
    className = "",
    ...props
}) {
    const base = "h-10 min-w-[84px] px-4 rounded-lg font-bold text-sm flex items-center justify-center transition-colors duration-200";

    return (
        <button
            type={type}
            className={`${base} ${bgcolour} ${textColour} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
