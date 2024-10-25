import React from "react";

function Badge({ children, className = "bg-indigo-100 text-indigo-700" }) {
    return <span className={`whitespace-nowrap rounded px-1.5 py-0.5 text-xs ${className}`}>{children}</span>;
}

export function BadgeWithClose({ children, className = "bg-indigo-100 text-indigo-700", onClick, buttonClassName = "bg-indigo-200 text-indigo-700 hover:bg-indigo-300" }) {
    return (
        <span className={`inline-flex items-center justify-center rounded-full mb-1 mx-0.5  px-2.5 py-0.5 ${className}`}>
            <p className="whitespace-nowrap text-sm">{children}</p>

            <button className={`-me-1 ms-1.5 inline-block rounded-full  p-0.5  transition ${buttonClassName}`} onClick={onClick}>
                <span className="sr-only">Remove badge</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </span>
    );
}

export default Badge;
