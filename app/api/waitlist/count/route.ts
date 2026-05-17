// Same GAS web app as app/api/waitlist/route.ts — doGet() must return { count: number }
const GAS_URL = 'https://script.google.com/macros/s/AKfycbys2x4rtCG_zMXhxIiF5rTEYUsEoobsKv3TnnnVQNoIbLhqaDSTeXDyW6S5SRiZoZDHMw/exec'

const TOTAL = 100

export async function GET() {
  try {
    const res = await fetch(GAS_URL, { next: { revalidate: 60 } })
    const data = await res.json()
    const count = typeof data.count === 'number' ? Math.min(TOTAL, Math.max(0, data.count)) : 0
    return Response.json({ count, remaining: TOTAL - count })
  } catch {
    return Response.json({ count: 0, remaining: TOTAL })
  }
}
