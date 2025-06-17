export async function POST(request, env) {
    const { president } = await request.json();
    const KEY = 'votes';
    const stored = await env.VOTES.get(KEY);
    const votes = stored ? JSON.parse(stored) : { president: {} };

    votes.president[president] = (votes.president[president] || 0) + 1;
    await env.VOTES.put(KEY, JSON.stringify(votes));

    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
    });
}