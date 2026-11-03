const IP_PATTERN = /^[0-9a-fA-F:.]*$/;

// Fetch IP details from ipapi.co for the browser (blank ip = the visitor's IP)
export default async function handler(req, res) {
  const ip = req.query.ip || req.headers["x-real-ip"] || "";
  if (!IP_PATTERN.test(ip)) {
    return res.status(400).json({ error: true, reason: "Invalid IP address" });
  }

  const url = ip === "" ? "https://ipapi.co/json/" : "https://ipapi.co/" + ip + "/json/";
  try {
    const reply = await fetch(url, { headers: { "User-Agent": "ipscout" } });
    res.status(reply.status).setHeader("Content-Type", "application/json");
    res.send(await reply.text());
  } catch {
    res.status(502).json({ error: true, reason: "Could not reach ipapi.co" });
  }
}
