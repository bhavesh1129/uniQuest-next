'use client'

import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { CalendarDays, PencilLine, ChevronUp, ChevronDown, Frown } from 'lucide-react'
import Image from 'next/image'
import getFormattedTime from '@/utils/fomattedTime'

const Question = ({ params }) => {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({});
  const [answers, setAnswers] = useState([]);
  const [expandedStates, setExpandedStates] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const getAnswersofAQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/answers/data/${params.slug}`);
      setAnswers(response.data);
      setExpandedStates(new Array(response.data.length).fill(false));
    } catch (error) {
      console.log('Answers not found', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getQuestion = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/questions/data/${params.slug}`);
        setQuestion(response.data);
      } catch (error) {
        console.log('Questions not found', error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    const getUserInfo = async () => {
      try {
        setLoading(true);
        const userInfo = await axios.get('/api/users/user');
        setSession(userInfo.data.data);
      } catch (error) {
        console.log('User info not found', error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAnswersofAQuestion();
    getUserInfo();
    getQuestion();
  }, [params.slug]);


  const handleAddAnswer = async () => {
    try {
      setLoading(true);
      const updatedAnswer = {
        answer: newAnswer,
        name: isAnonymous ? 'Anonymous' : session?.name,
        userId: session?._id,
        qnsId: params.slug
      };
      await axios.post(`/api/answers/data/${params.slug}`, updatedAnswer);
      getAnswersofAQuestion();
      setNewAnswer('');
      toast.success('Answer added successfully!');
    } catch (error) {
      console.log('Error adding answer', error.message);
      toast.error('Error adding answer');
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  const handleToggle = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center h-screen ">
            <div className="grid gap-2">
              <div className="flex items-center justify-center ">
                <div className="w-40 h-40 border-t-4 border-b-4 border-orange-700 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        ) : (
          <section className="mx-auto max-w-7xl px-2 py-10 md:px-0">
            <Toaster />
            <div>
              <div className="mx-auto max-w-5xl text-center mb-10">
                <h2 className="text-3xl capitalize font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                  {question?.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {question?.description}
                </p>

                <div className='flex items-center justify-between'>
                  <div className='flex capitalize items-center justify-center mt-4 text-sm leading-relaxed text-gray-600 font-semibold'>
                    <PencilLine size={15} />
                    <p>&nbsp;{question?.name}</p>
                  </div>

                  <div className='flex items-center justify-center mt-4 text-xs leading-relaxed text-gray-400 font-semibold'>
                    <CalendarDays size={15} />
                    <p>&nbsp;{getFormattedTime(question?.createdAt)}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="mt-6 w-full p-2 border rounded-md outline-0 shadow-sm"
                    id='answer'
                  ></textarea>
                  <div>
                    <input
                      className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-gray-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-gray-500 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer"
                      type="checkbox"
                      role="switch"
                      id="name"
                      onChange={handleToggle}
                    />
                    <label
                      className="capitalize inline-block pl-[0.15rem] text-gray-500 font-medium hover:pointer-events-none"
                      htmlFor="name"
                    >
                      {isAnonymous ? 'Anonymous' : session?.name}
                    </label>
                  </div>
                  <button onClick={handleAddAnswer} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="fill-current w-4 h-4 mr-2">
                      <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                    </svg>
                    <span>Add Answer</span>
                  </button>
                </div>
              </div>

              {
                answers.length > 0 ? (
                  answers?.map((answer, index) => (
                    <div key={index} className="mx-auto mt-4 max-w-4xl space-y-4 md:mt-6">
                      <div
                        className={`cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200 ${expandedStates[index] ? 'border-gray-500' : ''}`}
                      >
                        <button type="button" className="flex w-full items-start justify-between px-4 py-5 sm:p-6" onClick={() => toggleAccordion(index)}>
                          <Image src={session?.image} alt={answer?.name} width={40} height={40} className='rounded-md' />
                          <p className="text-lg font-semibold text-black">Answer by <span className='capitalize'>{answer?.name}</span></p>
                          {expandedStates[index] ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {expandedStates[index] ? (
                          <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                            <p className="text-gray-500">{answer?.answer}</p>
                          </div>
                        ) : (
                          <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                            <p className="text-gray-500">{answer?.answer?.slice(0, 220)}...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center text-2xl mt-6 font-bold text-red-500 justify-center'>
                    <Frown />
                    <h2>&nbsp;No answers yet!</h2>
                  </div>
                )
              }
            </div>
          </section >
        )
      }
    </>
  )
}

export default Question
