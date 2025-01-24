document.getElementById('submit-key').addEventListener('click', async () => {
  const key = document.getElementById('key-input').value;
  
  if (!key) return alert('Masukkan key terlebih dahulu');

  const response = await fetch('http://localhost:3000/validate-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key })
  });

  const data = await response.json();
  if (data.valid) {
    document.cookie = `authKey=${key}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    alert('Key valid, akses diberikan');
    location.reload();
  } else {
    alert('Key tidak valid atau sudah expired');
  }
});

// Cek apakah key tersimpan
window.onload = () => {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('authKey='));
  if (!cookies) {
    document.querySelector('.container-button').style.display = 'none';
  }
};


document.querySelectorAll(".cookie-btn").forEach(button => {
  button.addEventListener("click", function () {
    let service = this.dataset.service;
    let jsonFile = `${service}.json`;

    let urlMap = {
      canva: "https://www.canva.com",
      chatgpt: "https://chatgpt.com/#groupy",
      claude: "https://claude.ai/new",
      claude2: "https://claude.ai/new",
      netflix1: "https://www.netflix.com",
      netflix2: "https://www.netflix.com",
      netflix3: "https://www.netflix.com",
      netflix4: "https://www.netflix.com",
      netflix5: "https://www.netflix.com",
      netflix6: "https://www.netflix.com",
      netflix7: "https://www.netflix.com"
    };

    let targetURL = urlMap[service] || "https://www.google.com"; // Default jika tidak ditemukan

    // Mengambil file JSON yang sesuai
    fetch(jsonFile)
      .then(response => {
        if (!response.ok) throw new Error('File JSON tidak ditemukan');
        return response.json();
      })
      .then(cookieData => {
        if (Array.isArray(cookieData) && cookieData.length > 0) {
          let cookies = cookieData.map(cookie => ({
            url: targetURL,
            domain: cookie.domain,
            expirationDate: 9999999999,
            name: cookie.name,
            path: cookie.path,
            value: cookie.value,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly
          }));

          // Kirim pesan ke background.js untuk menyisipkan cookies
          chrome.runtime.sendMessage(
            {
              action: "insert-cookie",
              cookies: cookies
            },
            function (response) {
              if (chrome.runtime.lastError) {
                console.error("Error dari background script:", chrome.runtime.lastError);
              } else {
                console.log("Response dari background:", response);
                chrome.tabs.create({ url: targetURL }); // Membuka tab ke layanan terkait
              }
            }
          );
        } else {
          console.error('Data cookies tidak ditemukan atau formatnya salah');
        }
      })
      .catch(error => console.error('Error mengambil data cookie:', error));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const buttons = document.querySelectorAll(".cookie-btn");

  searchBar.addEventListener("input", function () {
    const query = searchBar.value.toLowerCase();

    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      if (text.includes(query)) {
        button.style.display = "flex"; // Menampilkan tombol jika cocok
      } else {
        button.style.display = "none"; // Menyembunyikan tombol jika tidak cocok
      }
    });
  });
});

