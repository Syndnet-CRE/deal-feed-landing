// Dashboard app URL — set NEXT_PUBLIC_APP_URL in Netlify env vars
// e.g. https://app.nightdrop.com or https://deal-feed-dashboard.netlify.app
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? ''

export const LOGIN_URL = `${APP_URL}/login`
export const SIGNUP_URL = `${APP_URL}/signup`
