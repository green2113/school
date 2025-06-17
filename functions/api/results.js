export async function GET(request, env) {
  const KEY = 'votes';
  const stored = await env.VOTES.get(KEY);
  const votes = stored ? JSON.parse(stored) : { president: {} };

  return new Response(JSON.stringify(votes), {
    headers: { 'Content-Type': 'application/json' }
  });
}
