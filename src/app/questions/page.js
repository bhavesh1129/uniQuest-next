'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { PenLine } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/questions/data');

        // Perform a lookup to replace topicName ObjectId with actual topicName
        const questionsWithTopics = await Promise.all(
          response.data.map(async (question) => {
            if (!question.topicName) {
              return { ...question, topicName: 'Unknown Topic' };
            }

            try {
              const topic = await getQuestionTopics(question.topicName);
              return { ...question, topicName: topic?.topicName || 'Unknown Topic' };
            } catch (error) {
              console.log('Error fetching topic for question:', question._id, error.message);
              return { ...question, topicName: 'Unknown Topic' };
            }
          })
        );
        setQuestions(questionsWithTopics);
      } catch (error) {
        console.log('Questions not found', error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getQuestions();
  }, []);

  const getQuestionTopics = async (topicID) => {
    try {
      const response = await axios.get(`/api/questions/topic/${topicID}`);
      return response.data;
    } catch (error) {
      console.log('Topics not found', error.message);
      toast.error(error.message);
    }
  };

  const getFormatedTime = (timestampStr) => {
    var options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    var readableFormat = new Date(timestampStr).toLocaleDateString('en-US', options);
    return readableFormat;
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
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
        ) :
          (
            <section className="text-gray-600 body-font overflow-hidden">
              <Toaster />
              <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  {
                    questions.map((question) => (
                      <div key={question?._id} className="py-8 flex flex-wrap md:flex-nowrap">
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                          <span className="font-semibold uppercase title-font text-gray-700">{question?.topicName}</span>
                          <span className="mt-1 text-gray-500 text-sm">{getFormatedTime(question?.createdAt)}</span>
                          <div className='flex justify-start mt-3'>
                            <PenLine className='text-sm h-4 w-4 text-gray-400' />
                            <span className="text-sm font-semibold capitalize text-gray-400">&nbsp;{question?.name}</span>
                          </div>
                        </div>
                        <div className="md:flex-grow">
                          <h2 className="text-2xl font-medium capitalize text-gray-900 title-font mb-2">{question?.title}</h2>
                          <p className="leading-relaxed">{truncateText(question?.description, 50)}</p>
                          <Link href={`/questions/${question?.slug}`} className="text-black inline-flex items-center mt-4 hover:text-gray-500">Learn More
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </section>
          )
      }

    </>
  )
}

export default QuestionsPage