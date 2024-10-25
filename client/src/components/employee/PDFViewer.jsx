import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const PDFViewer = ({ src, onClose, className }) => {
    return (
        <div className={`${className} relative`}>
            {/* <button className="text-xl  bg-red-500 absolute rounded-b-full p-1 font-bold  top-0 right-1" onClick={onClose}>
                <XMarkIcon className="w-5 h-5" />
            </button> */}

            <iframe src={`${src}#toolbar=0&navpanes=0`} width="100%" height="100%" />
        </div>
    );
};

export default PDFViewer;
