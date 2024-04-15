const { GoogleGenerativeAI } = require('@google/generative-ai');

const configuration = new GoogleGenerativeAI("AIzaSyAeFju6KESzS8vsebL8CB6py-FaowzIB6g");

const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

const conversationContext = [];
const currentMessages = [];

async function IAgenerateMocks(prompt) {

    for (const [inputText, responseText] of conversationContext) {
      currentMessages.push({ role: "user", parts: inputText });
      currentMessages.push({ role: "model", parts: responseText });
    }

    const chat = model.startChat({
      history: currentMessages,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const responseText = response.text();

    conversationContext.push([prompt, responseText]);

    return { response: responseText }
}

module.exports = {
    IAgenerateMocks
}