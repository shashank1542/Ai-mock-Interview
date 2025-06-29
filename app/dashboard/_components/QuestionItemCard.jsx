import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };
  return (
    <div className="border border-gray-300 shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary text-white">{question?.jobPosition}</h2>
      <h2 className="text-sm text-white-100">
        {question?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-white">Created At:{question.createdAt}</h2>

      <div className="flex justify-between mt-2 gap-5 ">
        <Button onClick={onStart} size="sm" className="w-full">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
