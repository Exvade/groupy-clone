document.getElementById("insert-cookie-btn").addEventListener("click", function () {
  // Mengambil file JSON
  fetch('canva.json')  // Sesuaikan dengan path file JSON yang benar
    .then(response => {
      if (!response.ok) {
        throw new Error('File JSON tidak ditemukan');
      }
      return response.json(); // Mengambil data JSON
    })
    .then(cookieData => {
      // Pastikan cookieData adalah array dan memiliki elemen
      if (Array.isArray(cookieData) && cookieData.length > 0) {
        // Menyisipkan cookies dari file JSON
        let cookies = cookieData.map(cookie => ({
          url: "https://www.canva.com",  // Pastikan URL adalah https://www.canva.com
          domain: cookie.domain,
          expirationDate: cookie.expirationDate,
          name: cookie.name,
          path: cookie.path,
          value: cookie.value,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly
        }));

        // Kirim pesan ke background script untuk menyisipkan cookies
        chrome.runtime.sendMessage(
          {
            action: "insert-cookie",
            cookies: cookies  // Kirim cookies yang ditemukan dalam file JSON
          },
          function (response) {
            if (chrome.runtime.lastError) {
              console.error("Error from background script:", chrome.runtime.lastError);
            } else {
              console.log("Response from background:", response);

              // Buka tab baru menuju Canva setelah cookie berhasil disisipkan
              chrome.tabs.create({ url: "https://www.canva.com" });
            }
          }
        );
      } else {
        console.error('Data cookies tidak ditemukan atau formatnya tidak sesuai');
      }
    })
    .catch(error => {
      console.error('Error fetching the cookie data:', error);
    });
});
