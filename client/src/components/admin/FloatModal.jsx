import React from "react";

function FloatModal({ onClose, children, title = "" }) {
    return (
        <>
            <div className={` overflow-y-auto bg-black bg-opacity-30 backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full`}>
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow max-w-[90%] lg:max-w-[75%] overflow-y-scroll xl:max-w-[40%]  mx-auto mt-20">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}

                    <div className="">{children}</div>
                </div>
            </div>
        </>
    );
}

export default FloatModal;
