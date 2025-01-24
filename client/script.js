async function submitKey() {
  const key = document.getElementById("keyInput").value;
  if (!key) return alert("Key tidak boleh kosong!");

  const response = await fetch("https://your-server.onrender.com/verify-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key })
  });

  const data = await response.json();
  if (data.valid) {
      document.cookie = `accessKey=${key}; path=/; max-age=${30 * 24 * 60 * 60}`;
      document.getElementById("message").innerText = "Key valid! Anda bisa menggunakan ekstensi.";
  } else {
      document.getElementById("message").innerText = "Key tidak valid atau sudah kadaluarsa.";
  }
}
