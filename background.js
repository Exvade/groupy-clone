chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "insert-cookie") {
    // Menyisipkan cookies dari request
    request.cookies.forEach(function (cookie) {
      chrome.cookies.set({
        url: "https://www.canva.com",  // Pastikan ini adalah URL yang benar sesuai dengan domain cookie
        name: cookie.name,
        value: cookie.value,
        expirationDate: cookie.expirationDate,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        path: cookie.path
      }, function (cookie) {
        if (chrome.runtime.lastError) {
          console.error("Error setting cookie:", chrome.runtime.lastError);
        } else {
          console.log("Cookie inserted:", cookie);
        }
      });
    });
  }
  sendResponse({ status: "Cookies inserted" });
  return true;  // Perlu untuk menunggu response asynchronous
});
