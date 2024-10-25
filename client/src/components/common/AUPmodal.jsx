import React from "react";
import FloatModal from "../admin/FloatModal";

function AUPmodel({ open, setOpen, onAccept }) {
    if (!open) {
        return <></>;
    }
    return (
        <FloatModal
            title="Acceptable Use Policy"
            onClose={() => {
                setOpen(false);
            }}
        >
            <div className="relative bg-white border-b  h-[70vh] overflow-y-scroll ">
                {/* <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Acceptable Use Policy</h3>
                </div> */}
                <div className="p-4 md:p-5">
                    <h1 className="text-2xl font-semibold">Acceptable Use Policy</h1>
                    <p className="text-gray-700 mt-2">
                        This Acceptable Use Policy (AUP) outlines the acceptable use of the <span className="font-bold italic">CreaTech</span> Web Application, which was created to increase
                        information security awareness among <span className="font-bold italic">MoodForCode</span> employees. Quizzes, policy acknowledgments, and security awareness training
                        are among the app's features. All users must follow the guidelines outlined in this AUP to ensure the application's security and integrity.
                    </p>
                    <h2 className="text-xl font-semibold mt-4">1. Applicability</h2>
                    <p className="text-gray-700 mt-2">This AUP applies to all users of the Web Application, including but not limited to:</p>
                    <div className="pl-5">
                        <ul className="list-disc list-inside text-gray-700 mt-2">
                            <li>Registered Employees</li>
                            <li>Administrators</li>
                            <li>Any Contractors or other individuals authorized to use the system</li>
                        </ul>
                    </div>
                    <h2 className="text-xl font-semibold mt-4">2. Prohibited Activities</h2>
                    <p className="text-gray-700 mt-2">
                        Users are not permitted to use the <span className="font-bold italic">CreaTech</span> Web Application for harmful, illegal, or infringing activities on the rights of others.
                        The following activities are strictly prohibited.
                    </p>
                    <div className="pl-5">
                        <h3 className=" text-xl font-medium mt-4">2.1 Illegal Activities</h3>
                        <p className="text-gray-700 mt-2">
                            Engaging in any activity that violates <b>local, national, or international laws,</b> including the <b>dissemination of illegal content.</b>
                        </p>
                    </div>
                    <div className="pl-5">
                        <h3 className=" text-xl font-medium mt-4">2.2 Unlawful Content</h3>
                        <p className="text-gray-700 mt-2">
                            <b>Uploading, sharing, or disseminating defamatory, obscene, or harmful content.</b>
                        </p>
                        <p>Infringing on another person's intellectual property rights is also prohibited.</p>
                    </div>
                    <div className="pl-5">
                        <h3 className=" text-xl font-medium mt-4">2.3 Security Violations</h3>
                        <p className="text-gray-700 mt-2">
                            Attempting to gain unauthorized access to the system or jeopardizing security, such as <b>introducing malware.</b> Engaging in activities that compromise the security of
                            our systems, such as <b>introducing viruses, malware, or other malicious code.</b>
                        </p>
                    </div>
                    <div className="pl-5">
                        <h3 className=" text-xl font-medium mt-4">2.4 Misrepresentation</h3>
                        <p className="text-gray-700 mt-2">
                            Impersonating other users or using false information <b>to create accounts</b> is prohibited. Engaging inImpersonating other users or using false information to create
                            accounts is prohibited. Engaging in phishing or other deceptive activities to defraud or obtain sensitive information from others. <b>phishing</b> or other deceptive
                            activities to <b>defraud or obtain sensitive information</b> from others.
                        </p>
                    </div>
                    <div className="pl-5">
                        <h3 className=" text-xl font-medium mt-4">2.5 Spam and Advertising</h3>
                        <p className="text-gray-700 mt-2">Unsolicited messages or advertisements must be approved before being sent.</p>
                        <p>
                            Promoting products or services without prior approval from <b>MoodForCode.</b>
                        </p>
                    </div>
                    <div className="pl-5">
                        <h3 className=" text-xl font-medium mt-4">2.6 Harassment and Abuse</h3>
                        <p className="text-gray-700 mt-2">
                            <b>Harassment, threats, or promoting hate speech </b>against any users based on race, gender, or other personal characteristics is strictly forbidden.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold mt-4">3. Users' responsibilities</h2>
                    <p className="text-gray-700 mt-2">Users are accountable for:</p>
                    <div className="pl-5">
                        <ul className="list-disc list-inside text-gray-700 mt-2 ">
                            <li>Maintaining the confidentiality of their login credentials.</li>
                            <li>Reporting any suspicious activity to the system administrator.</li>
                            <li>Adhering to corporate security policies and best practices.</li>
                        </ul>
                    </div>
                    {/* */}
                    <h2 className="text-xl font-semibold mt-4">4. Enforcement</h2>
                    <p className="text-gray-700 mt-2">
                        <span className="font-bold italic">MoodForCode</span> reserves the right to:
                    </p>
                    <div className="pl-5">
                        <ul className="list-disc list-inside text-gray-700 mt-2">
                            <li>Monitor user activity and content within the Application for compliance with this AUP.</li>
                            <li>Suspend, restrict, or terminate access to the Application for any user found to be in violation of this AUP.</li>
                            <li>Take legal action, if necessary, to prevent further violations and protect the rights and safety of all users.</li>
                        </ul>
                    </div>
                    {/* 6. Reporting Violations
Users are encouraged to report any violations of this policy to the administrator at
jpct.sliit@gmail.com
7. Amendments
This AUP may be updated from time to time to reflect new guidelines or requirements. Users will be informed
of any changes. */}
                    <h2 className="text-xl font-semibold mt-4">5. Reporting Violations</h2>
                    <p className="text-gray-700 mt-2">
                        Users are encouraged to report any violations of this policy to the administrator at{" "}
                        <a href="mailto:jpct.sliit@gmail.com" className="text-blue-500">
                            jpct.sliit@gmail.com
                        </a>
                    </p>
                    <h2 className="text-xl font-semibold mt-4">6. Amendments</h2>
                    <p className="text-gray-700 mt-2">This AUP may be updated from time to time to reflect new guidelines or requirements. Users will be informed of any changes.</p>
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 py-2 px-5">
                <button
                    className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    href="#"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Close
                </button>
                <button
                    className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    href="#"
                    onClick={onAccept}
                >
                    Accept
                </button>
            </div>
        </FloatModal>
    );
}

export default AUPmodel;
