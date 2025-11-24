import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: mode === 'production' ? '/Movie-Night/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'api-rerank-middleware',
          configureServer(server) {
            server.middlewares.use('/api/rerank', async (req, res) => {
              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.end('Method Not Allowed');
                return;
              }

              try {
                const body = await new Promise<string>((resolve, reject) => {
                  let data = '';
                  req.on('data', (chunk) => (data += chunk));
                  req.on('end', () => resolve(data));
                  req.on('error', reject);
                });

                const parsed = JSON.parse(body || '{}');
                const { criteria, candidates } = parsed as {
                  criteria: Record<string, string>;
                  candidates: Array<{ id?: string; title: string; description?: string; actors?: string[]; director?: string; }>;
                };

                const apiKey = env.GEMINI_API_KEY;
                if (!apiKey) {
                  res.statusCode = 503;
                  res.setHeader('content-type', 'application/json');
                  res.end(JSON.stringify({ error: 'AI is not configured' }));
                  return;
                }

                // Lazy import to keep plugin lightweight
                const { GoogleGenAI } = await import('@google/genai');
                const genai = new GoogleGenAI({ apiKey });

                const truncate = (text: string, n = 300) => text?.slice(0, n) || '';
                const items = candidates.map((c, idx) => ({
                  idx,
                  title: c.title,
                  description: truncate(c.description || ''),
                  director: c.director || '',
                  actors: (c.actors || []).slice(0, 4),
                }));

                const instruction = `You are ranking real movies for a user. Rank candidates 0-1 by how well they match the user's intent. Output JSON array with objects: { idx: number, score: number, reason: string }. Do not invent facts or new movies.`;
                const input = {
                  instruction,
                  criteria,
                  candidates: items,
                };

                const response = await genai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: JSON.stringify(input),
                  config: { temperature: 0.2 },
                });

                let text = (response as any).text?.trim?.() || '';
                if (text.startsWith('```')) {
                  const firstLineEnd = text.indexOf('\n');
                  text = text.slice(firstLineEnd + 1);
                  if (text.endsWith('```')) text = text.slice(0, -3);
                }

                let ranked: Array<{ idx: number; score: number; reason?: string }>; 
                try {
                  ranked = JSON.parse(text);
                } catch {
                  // Fallback: simple identity ranking
                  ranked = items.map(i => ({ idx: i.idx, score: 0.5 }));
                }

                ranked.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({ ranked }));
              } catch (err) {
                // eslint-disable-next-line no-console
                console.error('rerank error', err);
                res.statusCode = 500;
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to rerank' }));
              }
            });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
