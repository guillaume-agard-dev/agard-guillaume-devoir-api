async function loadDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/"; // Retour page login si pas connecté
    return;
  }

  const res = await fetch("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 401) {
    alert("Session expirée, reconnectez-vous.");
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const html = await res.text();
  document.getElementById("dashboard-container").innerHTML = html;
}

loadDashboard();