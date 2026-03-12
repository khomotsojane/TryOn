// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// export default async function handler(req, res) {
//   const { question, productImages } = req.body;

//   const prompt = `
// You are a fashion AI. 
// Question: ${question}
// Given these outfit images: ${productImages.join(", ")}
// Reply with a short answer and a list of the images you recommend.
// Return JSON: { "answer": "...", "recommendedImages": ["url1", "url2"] }
// `;

//   const completion = await openai.createChatCompletion({
//     model: "gpt-4",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7,
//   });

//   const responseText = completion.data.choices[0].message?.content;

//   try {
//     const json = JSON.parse(responseText || "{}");
//     res.status(200).json(json);
//   } catch {
//     res.status(200).json({ answer: responseText, recommendedImages: [] });
//   }
// }