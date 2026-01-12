import API_URL from "@/services/api"

export default function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  })
}
