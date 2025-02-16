import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { config } from 'dotenv';
import routeRecipe from './routes/route.js';

config();

const app = new Hono();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.route('/recipes', routeRecipe);

const port = Number(process.env.PORT || 8080);
console.log(`Server is running on http://localhost:${port} ✨`);

serve({
	fetch: app.fetch,
	port,
});
