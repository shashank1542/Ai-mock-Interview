/*import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className=" flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary bg-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2  rounded-full text-center text-black text-xs md:text-sm cursor-pointer md:block hidden bg-blue-100 text-blue-600 ${
                  activeQuestionIndex == index
                    ? "bg-black text-white"
                    : "bg-secondary"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg text-black ">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>
        <Volume2
          className="cursor-pointer text-black"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-100 mt-18 md:block hidden">
          <h2 className="flex gap-2 items-center text-blue-800">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-600 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;*/

import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="flex flex-col justify-between p-6 rounded-xl shadow-md bg-gray-900 border border-gray-700 my-4 space-y-6">
        
        {/* Question Pills */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestion.map((_, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full text-center text-sm font-semibold cursor-pointer transition duration-200 ${
                activeQuestionIndex === index
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Question #{index + 1}
            </div>
          ))}
        </div>

        {/* Current Question Display */}
        <div className="flex items-start justify-between">
          <h2 className="text-lg md:text-xl text-white font-medium max-w-[90%] leading-relaxed">
            {mockInterviewQuestion[activeQuestionIndex]?.Question}
          </h2>

          <Volume2
            className="text-blue-500 hover:text-blue-400 cursor-pointer transition-transform hover:scale-110"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
            }
          />
        </div>

        {/* Note Section */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 md:block hidden">
          <h2 className="flex items-center text-blue-800 font-semibold mb-2">
            <Lightbulb className="mr-2" />
            Note:
          </h2>
          <p className="text-sm text-blue-600 leading-relaxed">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </p>
        </div>
      </div>
    )
  );
};

export default QuestionSection;

