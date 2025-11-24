export const runtime = 'edge'

export async function POST(req: Request) {
  const { criteria, candidates } = await req.json()
  const ranked = (Array.isArray(candidates) ? candidates : [])
    .map((c: any, idx: number) => ({ idx, score: 0.5 }))
  return Response.json({ ranked })
}