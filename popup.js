document.querySelectorAll(".cookie-btn").forEach(button => {
  button.addEventListener("click", function () {
    let service = this.dataset.service;
    let jsonFile = `${service}.json`;

    let urlMap = {
      canva: "https://www.canva.com",
      chatgpt: "https://chat.openai.com",
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
            expirationDate: cookie.expirationDate,
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
