import axios from "axios";

const COHERE_API_KEY = process.env.NEXT_PUBLIC_COHERE_API_KEY;
const COHERE_API_URL = "https://api.cohere.ai/v1/chat";

export const getCohereFeedback = async (userAnswer, question) => {
  try {
    const response = await axios.post(
      COHERE_API_URL,
      {
        model: "command-r-08-2024",
        message: `Question: ${question}

User Answer: ${userAnswer}

Give a rating (1-10) and detailed feedback in STRICT JSON format like:
{
  "rating": 8,
  "feedback": "Your answer was clear, but you should add real examples."
}`,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cohere raw:", response.data);

    const rawText = response.data.text;

    const parsed = JSON.parse(rawText);

    return {
      rating: parsed.rating || "N/A",
      feedback: parsed.feedback || "No feedback",
    };
  } catch (error) {
    console.error(
      "Error fetching Cohere AI feedback:",
      error.response?.data || error.message
    );

    return {
      rating: "N/A",
      feedback: "Error processing feedback.",
    };
  }
};
