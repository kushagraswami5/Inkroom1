export default function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  window.location.href = "/"
}
