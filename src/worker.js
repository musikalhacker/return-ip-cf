export default {
  async fetch(request) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ua = request.headers.get("User-Agent") || "";
    const accept = request.headers.get("Accept") || "";

    // Return plain text for curl, wget, or any client that prefers text/plain
    const wantsText =
      ua.toLowerCase().includes("curl") ||
      ua.toLowerCase().includes("wget") ||
      accept.includes("text/plain") ||
      !accept.includes("text/html");

    if (wantsText) {
      return new Response(ip + "\n", {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // HTML page for browsers
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your IP</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .ip { font-size: 3rem; font-weight: 700; }
    .label { margin-top: 0.5rem; color: #555; }
  </style>
</head>
<body>
  <div class="ip">${ip}</div>
  <div class="label">Your public IP address</div>
</body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};