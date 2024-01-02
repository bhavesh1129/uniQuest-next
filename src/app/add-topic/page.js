"use client";

import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddTopicPage = () => {
    const router = useRouter();
    const [session, setSession] = useState({});
    const [topic, setTopic] = useState({
        topicName: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        const isAnyFieldEmpty = Object.values(topic).some((value) => value.trim() === '');
        setButtonDisabled(isAnyFieldEmpty);
    }, [topic]);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userInfo = await axios.get('/api/users/user');
                setSession(userInfo.data.data);
            } catch (error) {
                console.log('User info not found', error.message);
                toast.error(error.message);
            }
        };
        getUserInfo();
    }, []);

    const handleAddTopic = async () => {
        try {
            topic.userId = session._id;
            const response = await axios.post('/api/questions/topic', topic);
            console.log(response.data);
            toast.success("Your topic has been added successfully!");
            router.push('/add-question');
        } catch (error) {
            console.log('Topic not added', error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="mx-auto w-full max-w-7xl py-2">
            <Toaster />
            <div className="mx-auto my-4 max-w-2xl md:my-6">
                {/* Form */}
                <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
                    <div className="mb-4 flex items-center rounded-lg py-2">
                        <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
                            <PlusCircle size={20} />
                        </div>
                        <div className="flex flex-1">
                            <p className="text-lg font-bold">Add Topic</p>
                        </div>
                    </div>
                    <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
                        <div className="col-span-2 flex items-center">
                            <div className="w-3/4">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="topicName"
                                >
                                    Topic
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter the topic of your question"
                                    id="topicName"
                                    autoComplete="off" value={topic?.topicName} onChange={(e) => setTopic({ ...topic, topicName: e.target.value })}
                                ></input>
                            </div>

                            <div className="w-1/4">
                                <button
                                    className={`ml-1 mt-6 w-full rounded-md bg-black py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${buttonDisabled
                                        ? 'bg-black opacity-100 cursor-not-allowed'
                                        : 'bg-black hover:bg-black/80'
                                        }`}
                                    type="submit" disabled={buttonDisabled}
                                    id="addtopic" onClick={handleAddTopic}
                                >
                                    Add Topic
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTopicPage