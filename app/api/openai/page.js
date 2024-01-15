import { OpenAIApi, Configuration } from "openai";
import { NextApiRequest, NextApiResponse } from "next";
/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Missing a prompt" });
  }

  if (prompt.length > 200) {
    return res.status(400).json({ error: "prompt is too long" });
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  const quote = completion.data.choices[0].text;
  res.status(200).json({ quote });
}
