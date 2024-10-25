import React from "react";
import { useAuthStore } from "../../store/auth.store";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import AUPmodel from "../../components/common/AUPmodal";

export default function Registerpage() {
    const location = useLocation();

    const { register, loading } = useAuthStore((state) => state);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const [aupModalOpen, setAupModalOpen] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            toast.error("Password and password confirmation do not match");
            return;
        }

        setAupModalOpen(true);
    };

    const handleAupAccept = () => {
        const token = new URLSearchParams(location.search).get("token");
        register(email, password, firstName, lastName, token);
    };

    return (
        <>
            <AUPmodel
                open={aupModalOpen}
                setOpen={setAupModalOpen}
                onAccept={() => {
                    setAupModalOpen(false);
                    handleAupAccept();
                }}
            />
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img alt="" src="https://i.pinimg.com/originals/cf/ee/21/cfee21280620f8e982da6620dd0e498d.jpg" className="absolute inset-0 h-full w-full object-cover opacity-80" />

                        <div className="hidden lg:relative lg:block lg:p-12 bg-black bg-opacity-40 w-full backdrop-blur-md">
                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to CreaTech ✨</h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Createch is a cybersecurity training platform offering quizzes, videos, and policy management to enhance employee security awareness and improve organizational data
                                protection.
                            </p>
                        </div>
                    </section>

                    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-indigo-600 sm:size-20" href="#">
                                    <span className="sr-only">Home</span>
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                </a>

                                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Welcome to CreaTec ✨</h1>

                                <p className="mt-4 leading-relaxed text-gray-500">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        onChange={(event) => setFirstName(event.target.value)}
                                        value={firstName}
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        id="LastName"
                                        onChange={(event) => setLastName(event.target.value)}
                                        value={lastName}
                                        name="last_name"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                        {" "}
                                        Email{" "}
                                    </label>

                                    <input
                                        type="email"
                                        onChange={(event) => setEmail(event.target.value)}
                                        value={email}
                                        id="Email"
                                        name="email"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                                        {" "}
                                        Password{" "}
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                        name="password"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                        Password Confirmation
                                    </label>

                                    <input
                                        type="password"
                                        id="PasswordConfirmation"
                                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                                        value={passwordConfirmation}
                                        name="password_confirmation"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <Link to="#" className="text-gray-700 underline">
                                            {" "}
                                            terms and conditions{" "}
                                        </Link>
                                        and
                                        <Link to="#" className="text-gray-700 underline">
                                            privacy policy
                                        </Link>
                                        .
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        type="submit"
                                        disabled={!email || !password || !firstName || !lastName || !passwordConfirmation}
                                        className=" inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-8 sm:w-auto sm:text-sm"
                                    >
                                        {loading ? (
                                            <span className="px-2">
                                                <svg className="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            </span>
                                        ) : (
                                            "Create an account"
                                        )}
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-gray-700 underline">
                                            Log in
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}
