const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateAgentResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4", "gpt-4-turbo-preview", etc.
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    return "I'm sorry, I couldn't generate a response at this time.";
  }
};

exports.summarizeText = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize the following text: ${text}` }],
      max_tokens: 200,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error summarizing text with OpenAI:", error);
    return "I'm sorry, I couldn't summarize the text at this time.";
  }
}; 