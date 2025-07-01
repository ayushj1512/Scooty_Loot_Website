// composables/useSession.js

export function setSession(days = 21) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `isLoggedIn=true; expires=${expires.toUTCString()}; path=/`
}

export function getSession() {
  return document.cookie.split('; ').some(cookie => cookie === 'isLoggedIn=true')
}

export function clearSession() {
  document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
}
