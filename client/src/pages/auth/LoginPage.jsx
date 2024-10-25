import React, { useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const { login, loading, identify } = useAuthStore((state) => state);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
    };

    useEffect(() => {
        identify();
    }, []);

    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img alt="" src="https://i.pinimg.com/originals/cf/ee/21/cfee21280620f8e982da6620dd0e498d.jpg" className="absolute inset-0 h-full w-full object-cover opacity-80" />

                        <div className="hidden w-full lg:relative lg:block lg:p-12 bg-black bg-opacity-40 backdrop-blur-md">
                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to CreaTech ✨</h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Createch is a cybersecurity training platform offering quizzes, videos, and policy management to enhance employee security awareness and improve organizational
                                data protection.
                            </p>
                        </div>
                    </section>

                    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-indigo-600 sm:size-20" href="#">
                                    <span className="sr-only">Home</span>

                                    <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Welcome to CreaTech ✨</h1>
                                </a>
                                <p className="mt-4 leading-relaxed text-gray-500">
                                    Createch is a cybersecurity training platform offering quizzes, videos, and policy management to enhance employee security awareness and improve organizational data
                                    protection.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
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

                                <div className="col-span-6">
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

                                {/* <div className="col-span-6">
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
                                </div> */}

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        type="submit"
                                        disabled={!email || !password || loading}
                                        // className="inline-block w-full lg:w-auto  rounded-md border border-blue-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent disabled:bg-indigo-400 disabled:pointer-events-none hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
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
                                            "Log in"
                                        )}
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Don't have an account?{" "}
                                        <Link to="/register" className="text-gray-700 underline">
                                            Register
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
