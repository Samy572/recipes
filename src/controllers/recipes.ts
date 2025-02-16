import type { Context } from 'hono';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function runAi(food: string) {
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	const prompt = `Ecris une petite recettes simple avec comme ingredients : ${food} et en francais `;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(text);
	return text;
}

export const recipeController = async (c: Context) => {
	try {
		const body = await c.req.json();
		const { food } = body;
		if (!food) {
			return c.json({ message: 'query required' }, 404);
		}
		if (!process.env.GEMINI_API_KEY) {
			throw new Error('GEMINI_API_KEY is not defined');
		}
		const response = await runAi(food);
		return c.json({ response }, 200);
	} catch (err) {
		return console.error(err);
	}
};
