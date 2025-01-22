chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "insert-cookie") {
    request.cookies.forEach(function (cookie) {
      chrome.cookies.set({
        url: cookie.url,
        name: cookie.name,
        value: cookie.value,
        expirationDate: cookie.expirationDate,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        sameSite: ["lax", "no_restriction", "strict"].includes(cookie.sameSite) ? cookie.sameSite : "lax"
      }, function (result) {
        if (chrome.runtime.lastError) {
          console.error("Error setting cookie:", chrome.runtime.lastError);
        } else {
          console.log("Cookie inserted:", result);
        }
      });
    });
  }
  sendResponse({ status: "Cookies inserted" });
  return true;
});
