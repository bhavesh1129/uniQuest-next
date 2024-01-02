"use client";

import { FileQuestion } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddQuestionPage = () => {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [question, setQuestion] = useState({
    name: "",
    title: "",
    topic: "",
    description: "",
    userId: "",
    slug: ""
  });
  const [topics, setTopics] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const isAnyFieldEmptyExceptUserIdAndSlug = Object.entries(question).some(([key, value]) => {
      if (key === 'userId' || key === 'slug') {
        return false;
      }
      return value.trim() === '';
    });
    setButtonDisabled(isAnyFieldEmptyExceptUserIdAndSlug);
  }, [question]);

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

    const getQuestionTopics = async () => {
      try {
        const questionTopics = await axios.get('/api/questions/topic');
        setTopics(questionTopics.data);
      } catch (error) {
        console.log('Topics not found', error.message);
        toast.error(error.message);
      }
    };

    getQuestionTopics();
    getUserInfo();
  }, []);

  const handlePostQuestion = async () => {
    try {
      const updatedQuestion = { ...question };

      const selectedTopic = topics.find((topic) => topic.topicName === updatedQuestion.topic);

      if (!selectedTopic) {
        throw new Error("Selected topic not found");
      }
      updatedQuestion.topicName = selectedTopic._id;

      !updatedQuestion.name && (updatedQuestion.name = session.name);
      updatedQuestion.slug = slugify(updatedQuestion.title, { lower: true });
      updatedQuestion.userId = session._id;

      const response = await axios.post('/api/questions/data', updatedQuestion);
      console.log(response.data);
      toast.success("Your question has been posted successfully!");
      router.push('/questions');
    } catch (error) {
      console.log('Question not posted', error.message);
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
              <FileQuestion size={20} />
            </div>
            <div className="flex flex-1">
              <p className="text-lg font-bold">Add Question</p>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-900">Question Info</p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <select
                  className="flex capitalize h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Choose the topic of your question"
                  id="topic"
                  value={question?.name} onChange={(e) => setQuestion({ ...question, name: e.target.value })}
                >
                  <option value={session?.name}>{session?.name}</option>
                  <option value="Anonymous">Anonymous</option>
                </select>

                <span className="text-xs text-red-500 font-medium">*If you wish to maintain your identity as a secret, you can easily select <b>Anonymous</b> from the options above.</span>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="title"
                >
                  Title of your question
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter the title of your question"
                  id="title"
                  autoComplete="off" value={question?.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                ></input>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="w-3/4">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="topic"
                >
                  Topic
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 capitalize"
                  type="text"
                  placeholder="Choose the topic of your question"
                  id="topic"
                  value={question?.topic}
                  onChange={(e) => setQuestion({ ...question, topic: e.target.value })}
                >
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic.topicName}>
                      {topic.topicName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/4">
                <button
                  className="ml-1 mt-6 w-full rounded-md bg-black py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  type="submit"
                  id="addtopic"
                >
                  <Link href="/add-topic">Add Topic</Link>
                </button>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="flex h-40 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter the description of your question"
                  id="description"
                  autoComplete="off" value={question?.description} onChange={(e) => setQuestion({ ...question, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 grid">
              <button
                type="button"
                className={`w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${buttonDisabled
                  ? 'bg-black opacity-100 cursor-not-allowed'
                  : 'bg-black hover:bg-black/80'
                  }`} disabled={buttonDisabled} onClick={handlePostQuestion}
              >
                Post Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
