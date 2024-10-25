import React, { useEffect } from "react";
import { BadgeWithClose } from "../../components/common/Badge";
import { ArchiveBoxXMarkIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useUsersStore } from "../../store/users.store";
import { usePathwayStore } from "../../store/pathways.store";
import { useParams } from "react-router-dom";

function PathwaysIdPage() {
    const params = useParams();
    const { users, getUsers } = useUsersStore((state) => state);
    const { pathway, getPathway, updatePathway, deletePathway } = usePathwayStore((state) => state);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [enrolledUsers, setEnrolledUsers] = React.useState([]);
    const [materials, setMaterials] = React.useState([]);

    const moveUp = (index) => {
        if (index === 0) return; // Can't move up the first item

        const newMaterialItem = [...materials];
        // Swap with the item above
        const temp = newMaterialItem[index].order;
        newMaterialItem[index].order = newMaterialItem[index - 1].order;
        newMaterialItem[index - 1].order = temp;

        // Sort the array based on the updated order
        newMaterialItem.sort((a, b) => a.order - b.order);
        setMaterials(newMaterialItem);
    };

    // Step 3: Function to move an item down
    const moveDown = (index) => {
        if (index === materials.length - 1) return; // Can't move down the last item

        const newMaterialItem = [...materials];
        // Swap with the item below
        const temp = newMaterialItem[index].order;
        newMaterialItem[index].order = newMaterialItem[index + 1].order;
        newMaterialItem[index + 1].order = temp;

        // Sort the array based on the updated order
        newMaterialItem.sort((a, b) => a.order - b.order);
        setMaterials(newMaterialItem);
    };

    const updatePathwayHandler = async () => {
        const updatedPathway = {
            title: title,
            description: description,
            enrolledUsers: enrolledUsers,
            materials: materials,
        };
        console.log(updatedPathway);
        await updatePathway(params.id, updatedPathway);
    };

    const initialGetData = async () => {
        let pathway = await getPathway(params.id);
        setTitle(pathway?.title);
        setDescription(pathway?.description);
        let enrolledUsers = [];
        pathway?.enrolled?.forEach(async (user) => {
            console.log("user", user);
            let user_n = users.find((u) => u._id === user.user);
            if (!user_n) {
                user_n = { email: "Deleted User" };
            }
            enrolledUsers.push(user_n);
        });

        setEnrolledUsers(enrolledUsers);
        setMaterials(pathway?.materials);
    };
    console.log("users", users);
    console.log("enrolled users", enrolledUsers);

    useEffect(() => {
        initialGetData();
    }, []);
    return (
        <div className=" h-full flex flex-col ">
            <div className="">
                <div className="flex items-center justify-between px-4 py-2">
                    <h2 className="text-lg font-medium">Pathway: {pathway?._id}</h2>
                    <div className="flex items-center gap-2">
                        {/* Base */}

                        <button
                            onClick={updatePathwayHandler}
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                            Save
                        </button>

                        {/* Border */}

                        <button
                            onClick={() => {
                                deletePathway(params.id);
                            }}
                            className="inline-block rounded border border-red-600 px-12 py-3 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="h-[1px] bg-gray-100 my-4"></div>
            </div>
            <div className="grid grid-cols-5  flex-grow">
                <div className=" col-span-2 border-r px-2">
                    {/* <div>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700">
                        {" "}
                        Email{" "}
                    </label>

                    <input type="email" id="UserEmail" placeholder="john@rhcp.com" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                </div> */}
                    <div className="grid grid-cols-3 items-start gap-4 py-6 px-3 ">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Title
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder=""
                                className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-3 items-start gap-4 py-6 px-3">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Description
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <textarea
                                id="about"
                                name="about"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder=""
                                rows={3}
                                className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-3 items-start gap-4 py-6 px-3">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Enrolled Users
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            {/* TODO: FIX enrolled user by creating being null */}
                            <form
                                className="flex items-center gap-2"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!e.target.selected_user.value) return;
                                    // if user is already enrolled, don't add
                                    if (enrolledUsers.find((u) => u.email === e.target.selected_user.value)) {
                                        return;
                                    }
                                    let user = users.find((u) => u.email === e.target.selected_user.value);
                                    setEnrolledUsers([...enrolledUsers, user]);
                                    e.target.selected_user.value = "";
                                }}
                            >
                                <select name="selected_user" id="selected_user" className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                                    {users?.map((user, idx) => (
                                        <option key={idx} value={user.email}>
                                            {user?.id} - {user?.email}
                                        </option>
                                    ))}
                                </select>
                                <button className=" inline-block rounded bg-indigo-100 py-1.5 px-2 border-2 border-indigo-500">Add</button>
                            </form>

                            <div className="mt-2">
                                {enrolledUsers?.map((user, idx) => (
                                    <BadgeWithClose
                                        key={idx}
                                        onClick={() => {
                                            let newEnrolledUsers = [...enrolledUsers];
                                            newEnrolledUsers = newEnrolledUsers.filter((u) => u.email !== user.email);
                                            setEnrolledUsers(newEnrolledUsers);
                                        }}
                                    >
                                        {user?.id} {user?.email}
                                    </BadgeWithClose>
                                ))}
                                {/* <BadgeWithClose onClicked={() => {}}>John Doe</BadgeWithClose>
                            <BadgeWithClose onClicked={() => {}}>John Doe</BadgeWithClose> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 px-5">
                    <h4 className="text-lg">Materials</h4>
                    <div className="mt-10 flex flex-col gap-y-2">
                        {materials?.map((material, idx) => (
                            <div key={idx} className="grid grid-cols-10  gap-2 bg-gray-100 rounded-lg p-2">
                                <div className="col-span-3 flex items-center gap-3 pl-2">
                                    {idx + 1}
                                    <input
                                        type="text"
                                        id="title"
                                        placeholder="Title"
                                        value={material.title}
                                        onChange={(e) => {
                                            const newMaterials = [...materials];
                                            newMaterials[idx].title = e.target.value;
                                            setMaterials(newMaterials);
                                        }}
                                        className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <div>
                                        <select
                                            name="description"
                                            id="description"
                                            value={material.type}
                                            onChange={(e) => {
                                                const newMaterials = [...materials];
                                                newMaterials[idx].type = e.target.value;
                                                setMaterials(newMaterials);
                                            }}
                                            className=" w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            {["quiz", "video", "embed", "pdf"].map((item, idx) => (
                                                <option key={idx} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <input
                                        type="text"
                                        id="source"
                                        placeholder="source"
                                        value={material.source}
                                        onChange={(e) => {
                                            const newMaterials = [...materials];
                                            newMaterials[idx].source = e.target.value;
                                            setMaterials(newMaterials);
                                        }}
                                        className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-1 flex items-center gap-3 justify-end px-2">
                                    <span className="flex flex-col items-center">
                                        <button className="" onClick={() => moveUp(idx)}>
                                            <ChevronUpIcon className="size-5" />
                                        </button>
                                        <button className="" onClick={() => moveDown(idx)}>
                                            <ChevronDownIcon className="size-5" />
                                        </button>
                                    </span>
                                    <button
                                        onClick={() => {
                                            setMaterials((prev) => prev.filter((_, i) => i !== idx));
                                        }}
                                        className="text-red-500 p-1.5 hover:text-red-600  border-red-400 bg-red-100 rounded-md"
                                    >
                                        <ArchiveBoxXMarkIcon className=" size-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <form
                            className="grid grid-cols-10  gap-2 bg-gray-100 rounded-lg p-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const newMaterial = {
                                    title: e.target.title.value,
                                    type: e.target.type.value,
                                    source: e.target.source.value,
                                    order: materials.length,
                                };
                                setMaterials([...materials, newMaterial]);
                                // clear the form
                                e.target.title.value = "";
                                e.target.type.value = "quiz";
                                e.target.source.value = "";
                            }}
                        >
                            <div className="col-span-3 flex items-center gap-3 pl-2">
                                {materials?.length + 1}
                                <input type="text" id="title" placeholder="Title" className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <select name="type" id="type" className=" w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                                        {["quiz", "video", "embed", "pdf"].map((item, idx) => (
                                            <option key={idx} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <input type="text" id="source" placeholder="source" className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                            </div>
                            <div className="col-span-1 flex flex-col justify-center items-center">
                                <button className=" inline-block rounded bg-indigo-100 py-1.5 px-2 border-2 border-indigo-500" type="submit">
                                    <CheckIcon className="size-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PathwaysIdPage;
