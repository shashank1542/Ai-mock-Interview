/*"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);

    // Ensure feedback is correctly parsed as JSON (handling Gemini + Cohere AI feedback)
    const updatedFeedbackList = result.map((item) => {
      let parsedFeedback = {
        gemini: "No feedback available",
        cohere: "No feedback available",
      };
      let parsedRating = { gemini: "N/A", cohere: "N/A" };

      try {
        // Ensure both feedbacks are safely extracted
        if (item.feedback) {
          let cleanedFeedback = item.feedback
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          parsedFeedback = JSON.parse(cleanedFeedback);
        }

        if (item.rating) {
          let cleanedRating = item.rating
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          parsedRating = JSON.parse(cleanedRating);
        }
      } catch (error) {
        console.error("Error parsing feedback JSON:", error, item.feedback);
      }

      return { ...item, parsedFeedback, parsedRating };
    });

    setFeedbackList(updatedFeedbackList);
  };

  const overallRating = useMemo(() => {
    if (feedbackList.length > 0) {
      const totalGeminiRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.parsedRating?.gemini || 0),
        0
      );
      const totalCohereRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.parsedRating?.cohere || 0),
        0
      );

      const avgGemini = (totalGeminiRating / feedbackList.length).toFixed(1);
      const avgCohere = (totalCohereRating / feedbackList.length).toFixed(1);

      return { gemini: avgGemini, cohere: avgCohere };
    }
    return { gemini: 0, cohere: 0 };
  }, [feedbackList]);

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-black my-5">
          No Interview feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating{" "}
            <strong
              className={`${
                overallRating.gemini >= 5 ? "text-green-500" : "text-red-600"
              }`}
            >
              Gemini AI: {overallRating.gemini}/10
            </strong>{" "}
            <strong
              className={`${
                overallRating.cohere >= 5 ? "text-green-500" : "text-red-600"
              }`}
            >
              Cohere AI: {overallRating.cohere}/10
            </strong>
          </h2>

          <h2 className="text-sm text-gray-300">
            Find below interview question with correct answer, Your answer, and
            feedback for improvement
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full text-black">
                  {item.question} <ChevronDown className="h-5 w-5" />{" "}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Gemini Rating: </strong>
                      {item.parsedRating?.gemini || "N/A"}
                    </h2>
                    <h2 className="text-yellow-500 p-2 border rounded-lg">
                      <strong>Cohere Rating: </strong>
                      {item.parsedRating?.cohere || "N/A"}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>

                    
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Google Gemini Feedback: </strong>
                      {item.parsedFeedback?.gemini || "No feedback available"}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Cohere AI Feedback: </strong>
                      {item.parsedFeedback?.cohere || "No feedback available"}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button
  variant="outline"
  className="text-black border-black hover:bg-black hover:text-white"
  onClick={() => router.replace("/dashboard")}
>
  Go Home
</Button>

    </div>
  );
};

export default Feedback;*/

"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    const updatedFeedbackList = result.map((item) => {
      let parsedFeedback = { gemini: "No feedback available", cohere: "No feedback available" };
      let parsedRating = { gemini: "N/A", cohere: "N/A" };

      try {
        if (item.feedback) {
          const cleaned = item.feedback.replace(/```json/g, "").replace(/```/g, "").trim();
          parsedFeedback = JSON.parse(cleaned);
        }
        if (item.rating) {
          const cleaned = item.rating.replace(/```json/g, "").replace(/```/g, "").trim();
          parsedRating = JSON.parse(cleaned);
        }
      } catch (err) {
        console.error("Error parsing:", err, item.feedback);
      }

      return { ...item, parsedFeedback, parsedRating };
    });

    setFeedbackList(updatedFeedbackList);
  };

  const overallRating = useMemo(() => {
    if (feedbackList.length === 0) return { gemini: 0, cohere: 0 };

    const avg = (key) =>
      (
        feedbackList.reduce((sum, item) => sum + Number(item.parsedRating?.[key] || 0), 0) /
        feedbackList.length
      ).toFixed(1);

    return { gemini: avg("gemini"), cohere: avg("cohere") };
  }, [feedbackList]);

  return (
    <div className="p-6 md:p-10 bg-gray-900 text-white min-h-screen">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-200 my-5">No Interview Feedback Record Found</h2>
      ) : (
        <>
          <h2 className="text-4xl font-extrabold text-green-400">🎉 Congratulations!</h2>
          <h2 className="font-semibold text-xl text-gray-100 mt-2">
            Here's your interview feedback:
          </h2>

          <div className="my-4 text-base text-gray-300">
            Overall Rating:
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                overallRating.gemini >= 5 ? "bg-green-700 text-white" : "bg-red-700 text-white"
              }`}
            >
              Gemini: {overallRating.gemini}/10
            </span>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                overallRating.cohere >= 5 ? "bg-green-700 text-white" : "bg-red-700 text-white"
              }`}
            >
              Cohere: {overallRating.cohere}/10
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Below you'll find each question with your answer, the correct answer, and AI feedback.
          </p>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mb-5">
              <CollapsibleTrigger className="bg-gray-800 rounded-lg p-4 shadow-md w-full flex justify-between items-center text-left font-semibold text-gray-100 hover:bg-gray-700 transition">
                <span>{item.question}</span>
                <ChevronDown className="h-5 w-5 text-gray-300" />
              </CollapsibleTrigger>

              <CollapsibleContent className="bg-gray-800 rounded-b-lg px-5 py-4 shadow-inner space-y-4 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-md border border-green-600 bg-green-900 text-green-100 text-sm">
                    <strong>Correct Answer: </strong> {item.correctAns}
                  </div>
                  <div className="p-3 rounded-md border border-red-600 bg-red-900 text-red-100 text-sm">
                    <strong>Your Answer: </strong> {item.userAns}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-md border border-blue-600 bg-blue-900 text-blue-100 text-sm">
                    <strong>Gemini Feedback: </strong> {item.parsedFeedback.gemini}
                  </div>
                  <div className="p-3 rounded-md border border-blue-600 bg-blue-900 text-blue-100 text-sm">
                    <strong>Cohere Feedback: </strong> {item.parsedFeedback.cohere}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-md border border-purple-600 bg-purple-900 text-purple-100 text-sm">
                    <strong>Gemini Rating: </strong> {item.parsedRating.gemini}
                  </div>
                  <div className="p-3 rounded-md border border-yellow-600 bg-yellow-900 text-yellow-100 text-sm">
                    <strong>Cohere Rating: </strong> {item.parsedRating.cohere}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button
        variant="outline"
        className="mt-6 border-white text-black hover:bg-white hover:text-black transition"
        onClick={() => router.replace("/dashboard")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
