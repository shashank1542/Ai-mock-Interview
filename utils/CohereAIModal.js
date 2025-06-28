import axios from "axios";

const COHERE_API_KEY = process.env.NEXT_PUBLIC_COHERE_API_KEY;
const COHERE_API_URL = "https://api.cohere.ai/v1/generate";

export const getCohereFeedback = async (userAnswer, question) => {
  try {
    if (!COHERE_API_KEY) {
      throw new Error("Cohere API key is missing! Check your .env.local file.");
    }

    const prompt = `
You are an AI interview evaluator. Analyze the user's answer and respond in this **strict JSON format** only (no explanation, no markdown):

{
  "rating": <number from 1 to 10>,
  "feedback": "<concise feedback to improve the answer>"
}

Question: ${question}
User Answer: ${userAnswer}
`;

    const response = await axios.post(
      COHERE_API_URL,
      {
        model: "command",
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.5,
        // Note: "format": "json" is not an accepted key for cohere API v1
        // Cohere will respond in plain text even for structured prompts
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let rawText = response.data?.generations?.[0]?.text?.trim() || "";

    // Clean up markdown or formatting
    rawText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON portion
    const jsonStartIndex = rawText.indexOf("{");
    if (jsonStartIndex !== -1) {
      rawText = rawText.substring(jsonStartIndex).trim();
    }

    console.log("Cohere raw response:", rawText); // Debugging log

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawText);

      // Validate the keys
      if (
        typeof parsedResponse.rating === "number" &&
        typeof parsedResponse.feedback === "string"
      ) {
        return parsedResponse;
      } else {
        throw new Error("Incomplete or invalid keys in JSON.");
      }
    } catch (error) {
      console.warn("Cohere response not parsable:", rawText);
      return {
        rating: "N/A",
        feedback: `Raw response: ${rawText}`,
      };
    }
  } catch (error) {
    console.error(
      "Error fetching Cohere AI feedback:",
      error.response?.data || error.message
    );
    return {
      rating: "N/A",
      feedback: "Error processing Cohere feedback.",
    };
  }
};
